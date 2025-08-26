# backend/python/solve_vrp_dwave.py
import sys, json, os

def build_simple_qubo(distance, n):
    # toy TSP-like QUBO (single vehicle); extend to multi-vehicle + capacity
    # Variables: x[i][k] -> index mapping
    idx = {}
    var = 0
    for i in range(n):
        for k in range(n):
            idx[(i,k)] = var; var += 1

    Q = {}

    # Cost: successive positions
    for k in range(n-1):
        for i in range(n):
            for j in range(n):
                if i==j: continue
                a = idx[(i,k)]
                b = idx[(j,k+1)]
                Q[(a,b)] = Q.get((a,b),0.0) + distance[i][j]

    lamA = 500.0; lamP = 500.0
    # Each customer appears exactly once
    for i in range(1,n):  # skip depot if you want
        # (1 - sum_k x_{i,k})^2 = 1 -2sum + 2sum pairs ...
        for k in range(n):
            a = idx[(i,k)]
            Q[(a,a)] = Q.get((a,a),0.0) + lamA
            for l in range(k+1,n):
                b = idx[(i,l)]
                Q[(a,b)] = Q.get((a,b),0.0) + 2*lamA
        for k in range(n):
            a = idx[(i,k)]
            Q[(a,a)] = Q.get((a,a),0.0) - 2*lamA

    # One customer per position
    for k in range(n):
        for i in range(n):
            a = idx[(i,k)]
            Q[(a,a)] = Q.get((a,a),0.0) + lamP
            for j in range(i+1,n):
                b = idx[(j,k)]
                Q[(a,b)] = Q.get((a,b),0.0) + 2*lamP
        for i in range(n):
            a = idx[(i,k)]
            Q[(a,a)] = Q.get((a,a),0.0) - 2*lamP

    return Q, idx

def solve_with_neal(Q):
    try:
        import neal
    except ImportError:
        # local fallback if 'neal' isn't available
        return None, 0
    sampler = neal.SimulatedAnnealingSampler()
    sampleset = sampler.sample_qubo(Q, num_reads=50)
    return sampleset.first.sample, sampleset.first.energy

def solve_with_dwave(Q):
    try:
        from dwave.system import LeapHybridSampler
        token = os.getenv("DWAVE_API_TOKEN","")
        if not token: return None, 0
        sampler = LeapHybridSampler()
        sampleset = sampler.sample_qubo(Q)
        return sampleset.first.sample, sampleset.first.energy
    except Exception:
        return None, 0

def decode(sample, idx, n, labels):
    # return order from assignment x[i,k]=1
    pos = {k: None for k in range(n)}
    for (i,k), var in idx.items():
        if sample.get(var,0) > 0.5:
            pos[k] = i
    order = [labels[pos[k]] for k in range(n) if pos[k] is not None]
    return order

def main():
    data = json.loads(sys.stdin.read())
    coords = data["coords"]
    D = data["distanceMatrix"]
    n = len(coords)

    Q, idx = build_simple_qubo(D, n)
    sample, energy = solve_with_dwave(Q)
    if sample is None:
        sample, energy = solve_with_neal(Q)

    order = decode(sample, idx, n, [c["id"] for c in coords]) if sample else [c["id"] for c in coords]
    # naive single route; wrap to multi-vehicle in hybrid with split/repair
    route = order if order[0]=="depot" else ["depot"] + [x for x in order if x!="depot"] + ["depot"]

    # compute distance
    id2idx = {c["id"]: i for i,c in enumerate(coords)}
    dist = 0
    for a,b in zip(route, route[1:]):
        dist += D[id2idx[a]][id2idx[b]]

    res = {
        "jobId": data.get("jobId"),
        "objective": data.get("objective","distance"),
        "totalDistance": dist,
        "routes": [{"vehicleId": data["vehicles"][0]["id"], "stops": route, "distance": dist, "eta": []}],
        "violations": [],
        "geojson": {"type":"FeatureCollection","features":[]}
    }
    print(json.dumps(res))

if __name__ == "__main__":
    main()
