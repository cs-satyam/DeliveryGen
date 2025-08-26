# backend/python/solve_vrp_qaoa.py
import sys, json
def main():
    data = json.loads(sys.stdin.read())
    # For a first cut, call the same neal-based QUBO to emulate
    # Replace with Qiskit QAOA workflow (NumPyMinimumEigensolver/QAOA + COBYLA)
    res = {
        "jobId": data.get("jobId"),
        "objective": data.get("objective","distance"),
        "totalDistance": None,
        "routes": [],
        "violations": [{"type":"not_implemented","detail":"QAOA stub"}],
        "geojson": {"type":"FeatureCollection","features":[]}
    }
    print(json.dumps(res))
if __name__ == "__main__":
    main()
