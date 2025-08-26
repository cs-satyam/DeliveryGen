# backend/python/solve_vrp_classical.py
import sys, json, math

def solve_classical(data):
    # Minimal placeholder: greedy insertion (replace with OR-Tools in your env)
    coords = data["coords"]
    vehicles = data["vehicles"]
    D = data["distanceMatrix"]
    n = len(coords)
    unvisited = set(range(1, n))  # 0 is depot
    routes = [[] for _ in vehicles]
    caps = [v.get("capacity", 999999) for v in vehicles]
    loads = [0]*len(vehicles)
    # Naive split by capacity
    v = 0
    while unvisited:
        if not routes[v]:
            routes[v] = [0]
        # pick nearest feasible
        last = routes[v][-1]
        best, bestj = 10**9, None
        for j in list(unvisited):
            dem = coords[j].get("demand", 0)
            if loads[v] + dem <= caps[v]:
                if D[last][j] < best:
                    best, bestj = D[last][j], j
        if bestj is None:
            routes[v].append(0)
            v = (v+1) % len(vehicles)
            continue
        routes[v].append(bestj)
        loads[v] += coords[bestj].get("demand",0)
        unvisited.remove(bestj)
    for v in range(len(vehicles)):
        if routes[v] and routes[v][-1] != 0: routes[v].append(0)

    # compute distance
    total = 0
    out = []
    for vi, r in enumerate(routes):
        dist = 0
        for a,b in zip(r, r[1:]): dist += D[a][b]
        total += dist
        out.append({
            "vehicleId": vehicles[vi]["id"],
            "stops": [coords[i]["id"] for i in r],
            "distance": dist,
            "eta": []  # fill in with time calc if you pass a time matrix
        })

    return {
        "jobId": data.get("jobId"),
        "objective": data.get("objective","distance"),
        "totalDistance": total,
        "totalTime": None,
        "routes": out,
        "violations": [],
        "geojson": {"type":"FeatureCollection","features":[]}
    }

def main():
    data = json.loads(sys.stdin.read())
    res = solve_classical(data)
    print(json.dumps(res))

if __name__ == "__main__":
    main()
