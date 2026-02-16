import { useState } from "react";

function App() {
  const [tourists, setTourists] = useState(0);
  const [alerts, setAlerts] = useState(0);

  return (
    <div
      style={{
        minHeight: "100vh",
        margin: 0,
        padding: 0,
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
        background: "linear-gradient(135deg, #FEF9E7 0%, #F8FAFC 100%)",
      }}
    >
      {/* Top bar */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          background: "rgba(255,255,255,0.96)",
          borderBottom: "1px solid #E5E7EB",
          backdropFilter: "blur(18px)",
        }}
      >
        <div
          style={{
            maxWidth: "1120px",
            margin: "0 auto",
            padding: "16px 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: 18,
                background:
                  "linear-gradient(135deg, #1E3A8A 0%, #3B82F6 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 18px 35px rgba(15,23,42,0.4)",
              }}
            >
              <span style={{ fontSize: 30, color: "white" }}>🛡️</span>
            </div>
            <div>
              <div
                style={{
                  fontSize: 22,
                  fontWeight: 900,
                  letterSpacing: 0.4,
                  color: "#111827",
                }}
              >
                SafeTravel AI
              </div>
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#6B7280",
                }}
              >
                Ranipet District Police – Command Dashboard
              </div>
            </div>
          </div>

          <div style={{ textAlign: "right" }}>
            <div
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: "#1E3A8A",
                textTransform: "uppercase",
              }}
            >
              Science Expo 2026
            </div>
            <div style={{ fontSize: 12, color: "#6B7280" }}>
              Govt. School – Tourist Safety Monitoring
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main
        style={{
          maxWidth: "1120px",
          margin: "0 auto",
          padding: "32px 24px 48px",
        }}
      >
        {/* Hero card */}
        <section
          style={{
            marginBottom: 32,
            borderRadius: 24,
            padding: 24,
            background: "rgba(255,255,255,0.96)",
            border: "1px solid #E5E7EB",
            boxShadow: "0 22px 45px rgba(15,23,42,0.10)",
            display: "flex",
            flexWrap: "wrap",
            gap: 24,
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ maxWidth: 520 }}>
            <div
              style={{
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: 1.4,
                textTransform: "uppercase",
                color: "#3B82F6",
                marginBottom: 6,
              }}
            >
              Live Tourist Safety Monitoring
            </div>
            <h1
              style={{
                fontSize: 30,
                lineHeight: 1.2,
                fontWeight: 900,
                color: "#111827",
                margin: 0,
                marginBottom: 8,
              }}
            >
              Blue & Beige Police Command Center Interface
            </h1>
            <p
              style={{
                fontSize: 14,
                color: "#4B5563",
                margin: 0,
              }}
            >
              This dashboard shows how police can track tourists, respond to
              panic alerts, and view live safety status for Ranipet district.
              Built with React + Vite and deployed on Vercel.
            </p>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 10,
              minWidth: 220,
            }}
          >
            <button
              type="button"
              onClick={() => setTourists((n) => n + 1)}
              style={{
                padding: "12px 18px",
                borderRadius: 999,
                border: "none",
                background:
                  "linear-gradient(135deg, #1E3A8A 0%, #3B82F6 100%)",
                color: "white",
                fontWeight: 700,
                fontSize: 14,
                cursor: "pointer",
                boxShadow: "0 18px 30px rgba(37,99,235,0.4)",
              }}
            >
              ➕ Simulate Tourist Check‑in
            </button>
            <button
              type="button"
              onClick={() => setAlerts((n) => n + 1)}
              style={{
                padding: "10px 18px",
                borderRadius: 999,
                border: "1px solid #FCA5A5",
                background: "#FEF2F2",
                color: "#B91C1C",
                fontWeight: 700,
                fontSize: 13,
                cursor: "pointer",
              }}
            >
              🚨 Simulate Panic Alert
            </button>
          </div>
        </section>

        {/* Stats cards */}
        <section
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 20,
            marginBottom: 32,
          }}
        >
          <div
            style={{
              borderRadius: 20,
              padding: 20,
              background: "#0F172A",
              color: "white",
              boxShadow: "0 18px 40px rgba(15,23,42,0.55)",
            }}
          >
            <div
              style={{
                fontSize: 13,
                color: "#E5E7EB",
                marginBottom: 4,
              }}
            >
              Active Tourists
            </div>
            <div
              style={{
                fontSize: 34,
                fontWeight: 900,
                marginBottom: 6,
              }}
            >
              {tourists}
            </div>
            <div style={{ fontSize: 12, color: "#9CA3AF" }}>
              Number of tourists currently registered in the system.
            </div>
          </div>

          <div
            style={{
              borderRadius: 20,
              padding: 20,
              background: "white",
              border: "1px solid #E5E7EB",
              boxShadow: "0 16px 30px rgba(15,23,42,0.08)",
            }}
          >
            <div
              style={{
                fontSize: 13,
                color: "#6B7280",
                marginBottom: 4,
              }}
            >
              Panic Alerts Today
            </div>
            <div
              style={{
                fontSize: 34,
                fontWeight: 900,
                color: "#B91C1C",
                marginBottom: 6,
              }}
            >
              {alerts}
            </div>
            <div style={{ fontSize: 12, color: "#9CA3AF" }}>
              Generated using the red "Simulate Panic Alert" button.
            </div>
          </div>

          <div
            style={{
              borderRadius: 20,
              padding: 20,
              background: "white",
              border: "1px solid #F5F5DC",
            }}
          >
            <div
              style={{
                fontSize: 13,
                color: "#78716C",
                marginBottom: 4,
              }}
            >
              Color Theme
            </div>
            <div
              style={{
                fontSize: 18,
                fontWeight: 800,
                color: "#1E3A8A",
                marginBottom: 4,
              }}
            >
              Blue & Beige – Govt. Grade
            </div>
            <div style={{ fontSize: 12, color: "#6B7280" }}>
              Professional palette using navy blue for police UI and beige for
              background, suitable for real‑world government dashboards.
            </div>
          </div>
        </section>

        {/* Explainer */}
        <section
          style={{
            borderRadius: 20,
            padding: 20,
            background: "rgba(255,255,255,0.96)",
            border: "1px solid #E5E7EB",
            fontSize: 13,
            color: "#4B5563",
          }}
        >
          <div
            style={{
              fontSize: 16,
              fontWeight: 800,
              color: "#111827",
              marginBottom: 8,
            }}
          >
            How to explain this at the expo
          </div>
          <ul style={{ paddingLeft: 20, margin: 0 }}>
            <li>
              This panel is the <b>police command dashboard</b> for tourists in
              Ranipet.
            </li>
            <li>
              The blue button simulates a tourist checking in at a hotel or
              tourist spot.
            </li>
            <li>
              The red button simulates a panic alert, such as harassment,
              accident, or getting lost.
            </li>
            <li>
              The counters update instantly, showing how police can monitor the
              situation in real time.
            </li>
            <li>
              This is built with modern web tech (React + Vite) and deployed on
              Vercel, just like professional dashboards.
            </li>
          </ul>
        </section>
      </main>
    </div>
  );
}

export default App;
