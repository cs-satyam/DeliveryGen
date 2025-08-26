// controllers/vrpController.js
const { spawn } = require("child_process");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

function runPython(script, payload, env = {}) {
  return new Promise((resolve, reject) => {
    const py = spawn("python3", [path.join(__dirname, "..", "python", script)], {
      env: { ...process.env, ...env },
      stdio: ["pipe", "pipe", "pipe"],
    });

    let out = "";
    let err = "";
    py.stdout.on("data", d => (out += d.toString()));
    py.stderr.on("data", d => (err += d.toString()));

    py.on("close", code => {
      if (code !== 0) return reject(new Error(err || `Exit ${code}`));
      try { resolve(JSON.parse(out)); } catch (e) { reject(e); }
    });

    py.stdin.write(JSON.stringify(payload));
    py.stdin.end();
  });
}

exports.solve = async (req, res) => {
  try {
    const jobId = uuidv4();
    const {
      solver = "hybrid", // 'classical' | 'qaoa' | 'dwave' | 'hybrid'
      coords,            // [{id, lat, lng, demand, twStart?, twEnd?, service?}, ...] first item can be depot
      vehicles,          // [{id, capacity}], depotIndex = 0 by convention
      distanceMatrix,    // NxN matrix (meters or seconds)
      objective = "distance", // 'distance' | 'time' | 'fuel'
      softPenalties = { capacity: 1000, time: 1000 }
    } = req.body;

    if (!Array.isArray(coords) || !Array.isArray(vehicles) || !Array.isArray(distanceMatrix)) {
      return res.status(400).json({ error: "Invalid payload." });
    }

    // Normalize payload for solvers
    const payload = {
      jobId, solver, coords, vehicles, distanceMatrix, objective, softPenalties
    };

    let result;
    if (solver === "classical") {
      result = await runPython("solve_vrp_classical.py", payload);
    } else if (solver === "qaoa") {
      result = await runPython("solve_vrp_qaoa.py", payload, {
        IBMQ_TOKEN: process.env.IBMQ_TOKEN || ""
      });
    } else if (solver === "dwave") {
      result = await runPython("solve_vrp_dwave.py", payload, {
        DWAVE_API_TOKEN: process.env.DWAVE_API_TOKEN || ""
      });
    } else {
      // hybrid: classical seed -> quantum refine -> classical repair
      const seed = await runPython("solve_vrp_classical.py", { ...payload, mode: "seed" });
      const refined = await runPython("solve_vrp_dwave.py", { ...payload, seed });
      result = await runPython("solve_vrp_classical.py", { ...payload, initial: refined, mode: "repair" });
    }

    return res.json(result);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: e.message });
  }
};

// Optional if you move to async + queue later
exports.getJobStatus = async (req, res) => {
  return res.json({ id: req.params.id, status: "done", result: null });
};
