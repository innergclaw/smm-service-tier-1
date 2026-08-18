(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([
  "object" == typeof document ? document.currentScript : void 0,
  36483,
  (e) => {
    "use strict";
    var s = e.i(62932),
      a = e.i(77213);
    let r = [
      {
        label: "Aries Club",
        note: "Join the community on Discord",
        symbol: "01",
        href: "https://discord.gg/RTzygdF5N",
        featured: !0,
      },
      {
        label: "Marie Stems Floral",
        note: "Flowers, arrangements, and beautiful moments",
        symbol: "02",
        href: "https://www.msfloral.com/",
      },
      {
        label: "RYZE Coffee",
        note: "Explore my wellness coffee recommendation",
        symbol: "03",
        href: "https://get.aspr.app/SH1wfR",
      },
      {
        label: "InnerG Intelligence",
        note: "Connect with the InnerG community on Discord",
        symbol: "04",
        href: "https://discord.gg/3ryNWTvsX",
      },
      {
        label: "Digital Wedding Invites",
        note: "A luxury digital invitation experience by OWNYOURWEB",
        symbol: "05",
        href: "https://ownyourweb.marketing/demos/digital-wedding-invites/",
      },
    ];
    e.s([
      "default",
      0,
      function () {
        let [e, i] = (0, a.useState)("");
        async function l() {
          let e = {
            title: "Butterfly Links",
            text: "Entrepreneur • Lifestyle Enthusiast • Builder",
            url: window.location.href,
          };
          if (navigator.share) {
            try {
              await navigator.share(e);
            } catch {}
            return;
          }
          (await navigator.clipboard.writeText(window.location.href),
            i("Link copied to your clipboard."),
            window.setTimeout(() => i(""), 2600));
        }
        return (0, s.jsxs)("main", {
          className: "page-shell",
          children: [
            (0, s.jsx)("div", {
              className: "aurora aurora-one",
              "aria-hidden": "true",
            }),
            (0, s.jsx)("div", {
              className: "aurora aurora-two",
              "aria-hidden": "true",
            }),
            (0, s.jsxs)("div", {
              className: "star-field",
              "aria-hidden": "true",
              children: [
                (0, s.jsx)("i", {}),
                (0, s.jsx)("i", {}),
                (0, s.jsx)("i", {}),
                (0, s.jsx)("i", {}),
                (0, s.jsx)("i", {}),
                (0, s.jsx)("i", {}),
                (0, s.jsx)("i", {}),
                (0, s.jsx)("i", {}),
                (0, s.jsx)("i", {}),
                (0, s.jsx)("i", {}),
                (0, s.jsx)("i", {}),
                (0, s.jsx)("i", {}),
              ],
            }),
            (0, s.jsx)("span", {
              className: "butterfly-shape butterfly-one",
              "aria-hidden": "true",
              children: (0, s.jsx)("b", {}),
            }),
            (0, s.jsx)("span", {
              className: "butterfly-shape butterfly-two",
              "aria-hidden": "true",
              children: (0, s.jsx)("b", {}),
            }),
            (0, s.jsx)("span", {
              className: "butterfly-shape butterfly-three",
              "aria-hidden": "true",
              children: (0, s.jsx)("b", {}),
            }),
            (0, s.jsxs)("section", {
              className: "link-card",
              "aria-labelledby": "profile-name",
              children: [
                (0, s.jsx)("div", {
                  className: "card-glow",
                  "aria-hidden": "true",
                }),
                (0, s.jsxs)("header", {
                  className: "profile-head",
                  children: [
                    (0, s.jsx)("button", {
                      className: "share-button",
                      type: "button",
                      onClick: l,
                      "aria-label": "Share this page",
                      children: "Share",
                    }),
                    (0, s.jsx)("div", {
                      className: "portrait",
                      children: (0, s.jsx)("img", {
                        src: "./assets/butterfly-profile-photo.jpg",
                        alt: "Yakira Lynn",
                      }),
                    }),
                    (0, s.jsx)("p", {
                      className: "overline",
                      children: "Welcome to my little corner of the internet",
                    }),
                    (0, s.jsx)("h1", {
                      id: "profile-name",
                      children: "YAKIRA LYNN",
                    }),
                    (0, s.jsxs)("p", {
                      className: "role",
                      children: [
                        "Entrepreneur • Lifestyle Enthusiast • Builder",
                      ],
                    }),
                  ],
                }),
                (0, s.jsx)("div", {
                  className: "link-stack",
                  "aria-label": "Profile links",
                  children: r.map((e) =>
                    (0, s.jsxs)(
                      "details",
                      {
                        name: "yakira-links",
                        className: e.featured
                          ? "link-disclosure featured"
                          : "link-disclosure",
                        children: [
                          (0, s.jsxs)("summary", {
                            children: [
                              (0, s.jsx)("span", {
                                className: "link-number",
                                children: e.symbol,
                              }),
                              (0, s.jsxs)("span", {
                                className: "link-copy",
                                children: [
                                  (0, s.jsx)("strong", { children: e.label }),
                                  (0, s.jsx)("small", {
                                    children: "Tap to reveal",
                                  }),
                                ],
                              }),
                              (0, s.jsx)("span", {
                                className: "link-caret",
                                "aria-hidden": "true",
                              }),
                            ],
                          }),
                          (0, s.jsxs)("div", {
                            className: "link-panel",
                            children: [
                              (0, s.jsxs)("div", {
                                className: "dust",
                                "aria-hidden": "true",
                                children: [
                                  (0, s.jsx)("i", {}),
                                  (0, s.jsx)("i", {}),
                                  (0, s.jsx)("i", {}),
                                  (0, s.jsx)("i", {}),
                                  (0, s.jsx)("i", {}),
                                  (0, s.jsx)("i", {}),
                                  (0, s.jsx)("i", {}),
                                  (0, s.jsx)("i", {}),
                                ],
                              }),
                              (0, s.jsx)("p", { children: e.note }),
                              (0, s.jsxs)("a", {
                                href: e.href,
                                target: "_blank",
                                rel: "noopener noreferrer",
                                children: ["Open ", e.label],
                              }),
                            ],
                          }),
                        ],
                      },
                      e.label,
                    ),
                  ),
                }),
                (0, s.jsx)("footer", {
                  className: "card-footer",
                  children: (0, s.jsx)("p", {
                    children: "Soft life. Bold dreams. Beautiful becoming.",
                  }),
                }),
                (0, s.jsxs)("div", {
                  className: "social-links",
                  "aria-label": "Social media links",
                  children: [
                    (0, s.jsxs)("a", {
                      href: "https://www.instagram.com/mariestemsfloral?igsh=Z3ludWV2cmNia2U=",
                      target: "_blank",
                      rel: "noopener noreferrer",
                      children: [
                        (0, s.jsx)("strong", { children: "IG" }),
                        (0, s.jsx)("span", { children: "Marie Stems Floral" }),
                      ],
                    }),
                    (0, s.jsxs)("a", {
                      href: "https://substack.com/@yakiralynn?r=7ynv7m&utm_medium=ios&utm_source=stories&shareImageVariant=blur",
                      target: "_blank",
                      rel: "noopener noreferrer",
                      children: [
                        (0, s.jsx)("strong", { children: "SUBSTACK" }),
                        (0, s.jsx)("span", { children: "Yakira Lynn" }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
            e &&
              (0, s.jsxs)("div", {
                className: "toast",
                role: "status",
                children: [
                  (0, s.jsx)("span", {
                    className: "toast-dot",
                    "aria-hidden": "true",
                  }),
                  e,
                ],
              }),
          ],
        });
      },
    ]);
  },
]);
