/* ==========================================================================
   FLOATING CHATBOT — free, rule-based, answers from the live portfolio data.
   No API key, no cost. Matches the visitor's question against keyword rules,
   pulling real facts (name, skills, projects, experience, contact, certs).
   ========================================================================== */
(function () {
  function ready(fn) {
    if (window.PORTFOLIO_READY) fn();
    else document.addEventListener("portfolio:ready", fn);
  }

  ready(function () {
    const data = window.PORTFOLIO_DATA;
    const p = data.profile;

    const toggle = document.getElementById("chatbot-toggle");
    const panel = document.getElementById("chatbot-panel");
    const body = document.getElementById("chatBody");
    const input = document.getElementById("chatInput");
    const sendBtn = document.getElementById("chatSend");
    const suggestWrap = document.getElementById("chatSuggest");

    const suggestions = [
      "skills",
      "projects",
      "work experience",
      "contact info",
      "certifications",
    ];

    function addMsg(text, who) {
      const m = document.createElement("div");
      m.className = "msg " + who;
      m.textContent = text;
      body.appendChild(m);
      body.scrollTop = body.scrollHeight;
    }

    function renderSuggestions() {
      suggestWrap.innerHTML = "";
      suggestions.forEach((s) => {
        const b = document.createElement("button");
        b.textContent = s;
        b.addEventListener("click", () => handleUserMessage(s));
        suggestWrap.appendChild(b);
      });
    }

    /* ---------- rule engine ---------- */
    const rules = [
      {
        test: /skill|tech|stack|know|language|tool/i,
        answer: () =>
          data.skills.map((g) => `${g.category}: ${g.items.join(", ")}`).join("\n"),
      },
      {
        test: /project|built|build|portfolio piece|work on/i,
        answer: () =>
          data.projects
            .map((pr) => `${pr.title} — ${pr.description}`)
            .join("\n\n"),
      },
      {
        test: /experience|intern|job|work history|career/i,
        answer: () =>
          data.experience.map((e) => `${e.title} at ${e.org} (${e.period})`).join("\n"),
      },
      {
        test: /educat|degree|college|cgpa|university|school|10th|12th|intermediate|ssc/i,
        answer: () =>
          data.education.map((e) => `${e.title} — ${e.org}${e.detail ? " (" + e.detail + ")" : ""} · ${e.period}`).join("\n"),
      },
      {
        test: /certificat|certif|aws|nptel/i,
        answer: () =>
          (data.certificates || []).map((c) => `${c.title} — ${c.issuer} (${c.year})`).join("\n") ||
          "Certificates are listed in the Certificates section below.",
      },
      {
        test: /achiev|award|hackathon|winner|recognition/i,
        answer: () => data.achievements.map((a) => a.title).join("\n"),
      },
      {
        test: /contact|email|phone|reach|hire|number/i,
        answer: () => `You can reach ${p.shortName} at ${p.email} or ${p.phone}. Based in ${p.location}.`,
      },
      {
        test: /github/i,
        answer: () => `GitHub: ${p.github}`,
      },
      {
        test: /whatsapp/i,
        answer: () => `You can WhatsApp ${p.shortName} directly: https://wa.me/${(p.whatsapp || "").replace(/\D/g, "")}`,
      },
      {
        test: /linkedin/i,
        answer: () => `LinkedIn: ${p.linkedin}`,
      },
      {
        test: /resume|cv/i,
        answer: () => "You can download the resume using the 'Download resume' button in the hero section.",
      },
      {
        test: /who are you|about you|introduce|who is/i,
        answer: () => `${p.name} — ${p.roles.join(" / ")}. ${p.summary}`,
      },
      {
        test: /hi|hello|hey/i,
        answer: () => `Hey! I'm ${p.shortName}'s portfolio assistant. Ask me about skills, projects, experience, or how to get in touch.`,
      },
      {
        test: /available|opportunit|open to|hiring/i,
        answer: () => p.availability,
      },
    ];

    function handleUserMessage(text) {
      addMsg(text, "user");
      input.value = "";
      const rule = rules.find((r) => r.test.test(text));
      const answer = rule
        ? rule.answer()
        : `I'm not sure about that yet — but you can ask about skills, projects, experience, education, certificates, or contact details. Or reach out directly to ${p.email}.`;
      setTimeout(() => addMsg(answer, "bot"), 320);
    }

    toggle.addEventListener("click", () => {
      panel.classList.toggle("open");
      toggle.classList.toggle("open");
      if (panel.classList.contains("open") && !body.dataset.greeted) {
        addMsg(`Hi! I'm ${p.shortName}'s assistant 👋 Ask me anything about his skills, projects or background.`, "bot");
        renderSuggestions();
        body.dataset.greeted = "1";
      }
    });

    sendBtn.addEventListener("click", () => {
      const v = input.value.trim();
      if (v) handleUserMessage(v);
    });
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        const v = input.value.trim();
        if (v) handleUserMessage(v);
      }
    });
  });
})();
