import type { LayoutSection, LayoutStyle, LayoutProject } from "@/lib/schemas/layout";

import { Button } from "@/components/ui/button";

type SectionEditorProps = {
  project: LayoutProject | null;
  selectedSectionId: string | null;
  onSectionChange: (section: LayoutSection) => void;
  onStyleChange: <K extends keyof LayoutStyle>(field: K, value: LayoutStyle[K]) => void;
};

const fieldClassName =
  "mt-2 h-11 w-full rounded-2xl border border-[var(--line)] bg-white/85 px-4 text-sm outline-none transition focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/10";
const textAreaClassName =
  "mt-2 min-h-28 w-full rounded-[1.5rem] border border-[var(--line)] bg-white/85 px-4 py-3 text-sm leading-7 outline-none transition focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/10";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-sm font-medium">{label}</span>
      {children}
    </label>
  );
}

function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input className={fieldClassName} {...props} />;
}

function TextArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={textAreaClassName} {...props} />;
}

function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return <select className={fieldClassName} {...props} />;
}

function updateSectionItems<T>(items: T[], index: number, nextValue: T) {
  return items.map((item, itemIndex) => (itemIndex === index ? nextValue : item));
}

function removeSectionItem<T>(items: T[], index: number) {
  return items.filter((_, itemIndex) => itemIndex !== index);
}

export function SectionEditor({
  project,
  selectedSectionId,
  onSectionChange,
  onStyleChange,
}: SectionEditorProps) {
  const selectedSection = project?.sections.find((section) => section.id === selectedSectionId) ?? null;
  const commit = (nextSection: LayoutSection) => onSectionChange(nextSection);

  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold tracking-tight">Editor</h2>
        <p className="mt-1 text-sm text-[var(--muted)]">Refine global styling and the currently selected section.</p>
      </div>

      <div className="surface rounded-[2rem] border border-[var(--line)] p-4 shadow-sm">
        {project ? (
          <div className="space-y-6">
            <div className="rounded-[1.5rem] border border-[var(--line)] bg-white/70 p-4">
              <p className="text-sm font-semibold">Global style</p>
              <div className="mt-4 grid gap-4 md:grid-cols-3">
                <Field label="Tone preset">
                  <Select
                    onChange={(event) => onStyleChange("tone", event.target.value as LayoutStyle["tone"])}
                    value={project.style.tone}
                  >
                    <option value="warm">Warm premium</option>
                    <option value="graphite">Graphite contrast</option>
                    <option value="linen">Linen light</option>
                  </Select>
                </Field>
                <Field label="Radius">
                  <Select
                    onChange={(event) => onStyleChange("radius", event.target.value as LayoutStyle["radius"])}
                    value={project.style.radius}
                  >
                    <option value="soft">Soft</option>
                    <option value="rounded">Rounded</option>
                    <option value="square">Square</option>
                  </Select>
                </Field>
                <Field label="Spacing">
                  <Select
                    onChange={(event) => onStyleChange("spacing", event.target.value as LayoutStyle["spacing"])}
                    value={project.style.spacing}
                  >
                    <option value="compact">Compact</option>
                    <option value="comfortable">Comfortable</option>
                    <option value="airy">Airy</option>
                  </Select>
                </Field>
              </div>
            </div>

            {selectedSection ? (
              <div className="rounded-[1.5rem] border border-[var(--line)] bg-white/70 p-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <Field label="Section label">
                    <TextInput onChange={(event) => commit({ ...selectedSection, label: event.target.value })} value={selectedSection.label} />
                  </Field>
                  <Field label="Section layout hint">
                    <TextInput onChange={(event) => commit({ ...selectedSection, layout: event.target.value })} value={selectedSection.layout} />
                  </Field>
                </div>

                <div className="mt-5 space-y-5">
                  {selectedSection.type === "navbar" ? (
                    <>
                      <Field label="Brand name">
                        <TextInput
                          onChange={(event) => commit({ ...selectedSection, content: { ...selectedSection.content, brandName: event.target.value } })}
                          value={selectedSection.content.brandName}
                        />
                      </Field>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium">Navigation links</p>
                          <Button
                            onClick={() =>
                              commit({
                                ...selectedSection,
                                content: {
                                  ...selectedSection.content,
                                  links: [...selectedSection.content.links, { label: `Link ${selectedSection.content.links.length + 1}`, href: "#" }],
                                },
                              })
                            }
                            size="sm"
                            type="button"
                            variant="outline"
                          >
                            Add link
                          </Button>
                        </div>
                        {selectedSection.content.links.map((link, index) => (
                          <div key={`${link.label}-${index}`} className="grid gap-3 md:grid-cols-[1fr_1fr_auto]">
                            <TextInput
                              aria-label={`Navbar link ${index + 1} label`}
                              onChange={(event) =>
                                commit({
                                  ...selectedSection,
                                  content: {
                                    ...selectedSection.content,
                                    links: updateSectionItems(selectedSection.content.links, index, { ...link, label: event.target.value }),
                                  },
                                })
                              }
                              value={link.label}
                            />
                            <TextInput
                              aria-label={`Navbar link ${index + 1} URL`}
                              onChange={(event) =>
                                commit({
                                  ...selectedSection,
                                  content: {
                                    ...selectedSection.content,
                                    links: updateSectionItems(selectedSection.content.links, index, { ...link, href: event.target.value }),
                                  },
                                })
                              }
                              value={link.href}
                            />
                            <Button
                              onClick={() =>
                                commit({
                                  ...selectedSection,
                                  content: {
                                    ...selectedSection.content,
                                    links: removeSectionItem(selectedSection.content.links, index),
                                  },
                                })
                              }
                              type="button"
                              variant="ghost"
                            >
                              Remove
                            </Button>
                          </div>
                        ))}
                      </div>
                    </>
                  ) : null}

                  {selectedSection.type === "hero" ? (
                    <>
                      <Field label="Eyebrow">
                        <TextInput onChange={(event) => commit({ ...selectedSection, content: { ...selectedSection.content, eyebrow: event.target.value } })} value={selectedSection.content.eyebrow} />
                      </Field>
                      <Field label="Heading">
                        <TextInput onChange={(event) => commit({ ...selectedSection, content: { ...selectedSection.content, heading: event.target.value } })} value={selectedSection.content.heading} />
                      </Field>
                      <Field label="Subheading">
                        <TextArea onChange={(event) => commit({ ...selectedSection, content: { ...selectedSection.content, subheading: event.target.value } })} value={selectedSection.content.subheading} />
                      </Field>
                      <Field label="Body">
                        <TextArea onChange={(event) => commit({ ...selectedSection, content: { ...selectedSection.content, body: event.target.value } })} value={selectedSection.content.body} />
                      </Field>
                      <div className="grid gap-4 md:grid-cols-2">
                        <Field label="Primary CTA label">
                          <TextInput
                            onChange={(event) =>
                              commit({
                                ...selectedSection,
                                content: {
                                  ...selectedSection.content,
                                  primaryCta: selectedSection.content.primaryCta
                                    ? { ...selectedSection.content.primaryCta, label: event.target.value }
                                    : { label: event.target.value, href: "#" },
                                },
                              })
                            }
                            value={selectedSection.content.primaryCta?.label ?? ""}
                          />
                        </Field>
                        <Field label="Primary CTA URL">
                          <TextInput
                            onChange={(event) =>
                              commit({
                                ...selectedSection,
                                content: {
                                  ...selectedSection.content,
                                  primaryCta: selectedSection.content.primaryCta
                                    ? { ...selectedSection.content.primaryCta, href: event.target.value }
                                    : { label: "Primary action", href: event.target.value },
                                },
                              })
                            }
                            value={selectedSection.content.primaryCta?.href ?? ""}
                          />
                        </Field>
                      </div>
                      <div className="grid gap-4 md:grid-cols-2">
                        <Field label="Secondary CTA label">
                          <TextInput
                            onChange={(event) =>
                              commit({
                                ...selectedSection,
                                content: {
                                  ...selectedSection.content,
                                  secondaryCta: event.target.value
                                    ? selectedSection.content.secondaryCta
                                      ? { ...selectedSection.content.secondaryCta, label: event.target.value }
                                      : { label: event.target.value, href: "#" }
                                    : undefined,
                                },
                              })
                            }
                            value={selectedSection.content.secondaryCta?.label ?? ""}
                          />
                        </Field>
                        <Field label="Secondary CTA URL">
                          <TextInput
                            onChange={(event) =>
                              commit({
                                ...selectedSection,
                                content: {
                                  ...selectedSection.content,
                                  secondaryCta: event.target.value
                                    ? selectedSection.content.secondaryCta
                                      ? { ...selectedSection.content.secondaryCta, href: event.target.value }
                                      : { label: "Secondary action", href: event.target.value }
                                    : undefined,
                                },
                              })
                            }
                            value={selectedSection.content.secondaryCta?.href ?? ""}
                          />
                        </Field>
                      </div>
                      <Field label="Highlights (one per line)">
                        <TextArea
                          onChange={(event) =>
                            commit({
                              ...selectedSection,
                              content: {
                                ...selectedSection.content,
                                highlights: event.target.value.split("\n").map((item) => item.trim()).filter(Boolean),
                              },
                            })
                          }
                          value={selectedSection.content.highlights.join("\n")}
                        />
                      </Field>
                    </>
                  ) : null}

                  {selectedSection.type === "features" ? (
                    <>
                      <Field label="Heading">
                        <TextInput onChange={(event) => commit({ ...selectedSection, content: { ...selectedSection.content, heading: event.target.value } })} value={selectedSection.content.heading} />
                      </Field>
                      <Field label="Subheading">
                        <TextArea onChange={(event) => commit({ ...selectedSection, content: { ...selectedSection.content, subheading: event.target.value } })} value={selectedSection.content.subheading} />
                      </Field>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium">Feature items</p>
                          <Button
                            onClick={() =>
                              commit({
                                ...selectedSection,
                                content: {
                                  ...selectedSection.content,
                                  items: [...selectedSection.content.items, { title: `Feature ${selectedSection.content.items.length + 1}`, description: "", meta: "" }],
                                },
                              })
                            }
                            size="sm"
                            type="button"
                            variant="outline"
                          >
                            Add feature
                          </Button>
                        </div>
                        {selectedSection.content.items.map((item, index) => (
                          <div key={`${item.title}-${index}`} className="rounded-[1.25rem] border border-[var(--line)] bg-white/80 p-4">
                            <div className="grid gap-4">
                              <Field label="Title">
                                <TextInput
                                  onChange={(event) =>
                                    commit({
                                      ...selectedSection,
                                      content: { ...selectedSection.content, items: updateSectionItems(selectedSection.content.items, index, { ...item, title: event.target.value }) },
                                    })
                                  }
                                  value={item.title}
                                />
                              </Field>
                              <Field label="Description">
                                <TextArea
                                  onChange={(event) =>
                                    commit({
                                      ...selectedSection,
                                      content: { ...selectedSection.content, items: updateSectionItems(selectedSection.content.items, index, { ...item, description: event.target.value }) },
                                    })
                                  }
                                  value={item.description}
                                />
                              </Field>
                              <Field label="Meta">
                                <TextInput
                                  onChange={(event) =>
                                    commit({
                                      ...selectedSection,
                                      content: { ...selectedSection.content, items: updateSectionItems(selectedSection.content.items, index, { ...item, meta: event.target.value }) },
                                    })
                                  }
                                  value={item.meta}
                                />
                              </Field>
                              <Button onClick={() => commit({ ...selectedSection, content: { ...selectedSection.content, items: removeSectionItem(selectedSection.content.items, index) } })} type="button" variant="ghost">
                                Remove feature
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  ) : null}

                  {selectedSection.type === "testimonials" ? (
                    <>
                      <Field label="Heading">
                        <TextInput onChange={(event) => commit({ ...selectedSection, content: { ...selectedSection.content, heading: event.target.value } })} value={selectedSection.content.heading} />
                      </Field>
                      <Field label="Subheading">
                        <TextArea onChange={(event) => commit({ ...selectedSection, content: { ...selectedSection.content, subheading: event.target.value } })} value={selectedSection.content.subheading} />
                      </Field>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium">Testimonials</p>
                          <Button
                            onClick={() =>
                              commit({
                                ...selectedSection,
                                content: {
                                  ...selectedSection.content,
                                  items: [...selectedSection.content.items, { quote: "New testimonial", author: "Customer", role: "" }],
                                },
                              })
                            }
                            size="sm"
                            type="button"
                            variant="outline"
                          >
                            Add testimonial
                          </Button>
                        </div>
                        {selectedSection.content.items.map((item, index) => (
                          <div key={`${item.author}-${index}`} className="rounded-[1.25rem] border border-[var(--line)] bg-white/80 p-4">
                            <div className="grid gap-4">
                              <Field label="Quote">
                                <TextArea
                                  onChange={(event) =>
                                    commit({
                                      ...selectedSection,
                                      content: { ...selectedSection.content, items: updateSectionItems(selectedSection.content.items, index, { ...item, quote: event.target.value }) },
                                    })
                                  }
                                  value={item.quote}
                                />
                              </Field>
                              <Field label="Author">
                                <TextInput
                                  onChange={(event) =>
                                    commit({
                                      ...selectedSection,
                                      content: { ...selectedSection.content, items: updateSectionItems(selectedSection.content.items, index, { ...item, author: event.target.value }) },
                                    })
                                  }
                                  value={item.author}
                                />
                              </Field>
                              <Field label="Role">
                                <TextInput
                                  onChange={(event) =>
                                    commit({
                                      ...selectedSection,
                                      content: { ...selectedSection.content, items: updateSectionItems(selectedSection.content.items, index, { ...item, role: event.target.value }) },
                                    })
                                  }
                                  value={item.role}
                                />
                              </Field>
                              <Button onClick={() => commit({ ...selectedSection, content: { ...selectedSection.content, items: removeSectionItem(selectedSection.content.items, index) } })} type="button" variant="ghost">
                                Remove testimonial
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  ) : null}

                  {selectedSection.type === "pricing" ? (
                    <>
                      <Field label="Heading">
                        <TextInput onChange={(event) => commit({ ...selectedSection, content: { ...selectedSection.content, heading: event.target.value } })} value={selectedSection.content.heading} />
                      </Field>
                      <Field label="Subheading">
                        <TextArea onChange={(event) => commit({ ...selectedSection, content: { ...selectedSection.content, subheading: event.target.value } })} value={selectedSection.content.subheading} />
                      </Field>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium">Plans</p>
                          <Button
                            onClick={() =>
                              commit({
                                ...selectedSection,
                                content: {
                                  ...selectedSection.content,
                                  plans: [...selectedSection.content.plans, { name: "New plan", price: "$0", description: "", features: [], cta: { label: "Choose", href: "#" } }],
                                },
                              })
                            }
                            size="sm"
                            type="button"
                            variant="outline"
                          >
                            Add plan
                          </Button>
                        </div>
                        {selectedSection.content.plans.map((plan, index) => (
                          <div key={`${plan.name}-${index}`} className="rounded-[1.25rem] border border-[var(--line)] bg-white/80 p-4">
                            <div className="grid gap-4 md:grid-cols-2">
                              <Field label="Plan name">
                                <TextInput
                                  onChange={(event) =>
                                    commit({
                                      ...selectedSection,
                                      content: { ...selectedSection.content, plans: updateSectionItems(selectedSection.content.plans, index, { ...plan, name: event.target.value }) },
                                    })
                                  }
                                  value={plan.name}
                                />
                              </Field>
                              <Field label="Price">
                                <TextInput
                                  onChange={(event) =>
                                    commit({
                                      ...selectedSection,
                                      content: { ...selectedSection.content, plans: updateSectionItems(selectedSection.content.plans, index, { ...plan, price: event.target.value }) },
                                    })
                                  }
                                  value={plan.price}
                                />
                              </Field>
                            </div>
                            <Field label="Description">
                              <TextArea
                                onChange={(event) =>
                                  commit({
                                    ...selectedSection,
                                    content: { ...selectedSection.content, plans: updateSectionItems(selectedSection.content.plans, index, { ...plan, description: event.target.value }) },
                                  })
                                }
                                value={plan.description}
                              />
                            </Field>
                            <Field label="Features (one per line)">
                              <TextArea
                                onChange={(event) =>
                                  commit({
                                    ...selectedSection,
                                    content: {
                                      ...selectedSection.content,
                                      plans: updateSectionItems(selectedSection.content.plans, index, {
                                        ...plan,
                                        features: event.target.value.split("\n").map((item) => item.trim()).filter(Boolean),
                                      }),
                                    },
                                  })
                                }
                                value={plan.features.join("\n")}
                              />
                            </Field>
                            <div className="grid gap-4 md:grid-cols-2">
                              <Field label="CTA label">
                                <TextInput
                                  onChange={(event) =>
                                    commit({
                                      ...selectedSection,
                                      content: { ...selectedSection.content, plans: updateSectionItems(selectedSection.content.plans, index, { ...plan, cta: { ...plan.cta, label: event.target.value } }) },
                                    })
                                  }
                                  value={plan.cta.label}
                                />
                              </Field>
                              <Field label="CTA URL">
                                <TextInput
                                  onChange={(event) =>
                                    commit({
                                      ...selectedSection,
                                      content: { ...selectedSection.content, plans: updateSectionItems(selectedSection.content.plans, index, { ...plan, cta: { ...plan.cta, href: event.target.value } }) },
                                    })
                                  }
                                  value={plan.cta.href}
                                />
                              </Field>
                            </div>
                            <Button onClick={() => commit({ ...selectedSection, content: { ...selectedSection.content, plans: removeSectionItem(selectedSection.content.plans, index) } })} type="button" variant="ghost">
                              Remove plan
                            </Button>
                          </div>
                        ))}
                      </div>
                    </>
                  ) : null}

                  {selectedSection.type === "cta" ? (
                    <>
                      <Field label="Heading">
                        <TextInput onChange={(event) => commit({ ...selectedSection, content: { ...selectedSection.content, heading: event.target.value } })} value={selectedSection.content.heading} />
                      </Field>
                      <Field label="Body">
                        <TextArea onChange={(event) => commit({ ...selectedSection, content: { ...selectedSection.content, body: event.target.value } })} value={selectedSection.content.body} />
                      </Field>
                      <div className="grid gap-4 md:grid-cols-2">
                        <Field label="Primary CTA label">
                          <TextInput
                            onChange={(event) => commit({ ...selectedSection, content: { ...selectedSection.content, primaryCta: { ...selectedSection.content.primaryCta, label: event.target.value } } })}
                            value={selectedSection.content.primaryCta.label}
                          />
                        </Field>
                        <Field label="Primary CTA URL">
                          <TextInput
                            onChange={(event) => commit({ ...selectedSection, content: { ...selectedSection.content, primaryCta: { ...selectedSection.content.primaryCta, href: event.target.value } } })}
                            value={selectedSection.content.primaryCta.href}
                          />
                        </Field>
                      </div>
                      <div className="grid gap-4 md:grid-cols-2">
                        <Field label="Secondary CTA label">
                          <TextInput
                            onChange={(event) =>
                              commit({
                                ...selectedSection,
                                content: {
                                  ...selectedSection.content,
                                  secondaryCta: event.target.value
                                    ? selectedSection.content.secondaryCta
                                      ? { ...selectedSection.content.secondaryCta, label: event.target.value }
                                      : { label: event.target.value, href: "#" }
                                    : undefined,
                                },
                              })
                            }
                            value={selectedSection.content.secondaryCta?.label ?? ""}
                          />
                        </Field>
                        <Field label="Secondary CTA URL">
                          <TextInput
                            onChange={(event) =>
                              commit({
                                ...selectedSection,
                                content: {
                                  ...selectedSection.content,
                                  secondaryCta: event.target.value
                                    ? selectedSection.content.secondaryCta
                                      ? { ...selectedSection.content.secondaryCta, href: event.target.value }
                                      : { label: "Learn more", href: event.target.value }
                                    : undefined,
                                },
                              })
                            }
                            value={selectedSection.content.secondaryCta?.href ?? ""}
                          />
                        </Field>
                      </div>
                    </>
                  ) : null}

                  {selectedSection.type === "footer" ? (
                    <>
                      <Field label="Brand name">
                        <TextInput onChange={(event) => commit({ ...selectedSection, content: { ...selectedSection.content, brandName: event.target.value } })} value={selectedSection.content.brandName} />
                      </Field>
                      <Field label="Body">
                        <TextArea onChange={(event) => commit({ ...selectedSection, content: { ...selectedSection.content, body: event.target.value } })} value={selectedSection.content.body} />
                      </Field>
                    </>
                  ) : null}

                  {selectedSection.type === "generic" ? (
                    <>
                      <Field label="Heading">
                        <TextInput onChange={(event) => commit({ ...selectedSection, content: { ...selectedSection.content, heading: event.target.value } })} value={selectedSection.content.heading} />
                      </Field>
                      <Field label="Subheading">
                        <TextArea onChange={(event) => commit({ ...selectedSection, content: { ...selectedSection.content, subheading: event.target.value } })} value={selectedSection.content.subheading} />
                      </Field>
                      <Field label="Body">
                        <TextArea onChange={(event) => commit({ ...selectedSection, content: { ...selectedSection.content, body: event.target.value } })} value={selectedSection.content.body} />
                      </Field>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium">Generic items</p>
                          <Button
                            onClick={() =>
                              commit({
                                ...selectedSection,
                                content: {
                                  ...selectedSection.content,
                                  items: [...selectedSection.content.items, { title: `Item ${selectedSection.content.items.length + 1}`, description: "", meta: "" }],
                                },
                              })
                            }
                            size="sm"
                            type="button"
                            variant="outline"
                          >
                            Add item
                          </Button>
                        </div>
                        {selectedSection.content.items.map((item, index) => (
                          <div key={`${item.title}-${index}`} className="rounded-[1.25rem] border border-[var(--line)] bg-white/80 p-4">
                            <div className="grid gap-4">
                              <Field label="Title">
                                <TextInput
                                  onChange={(event) =>
                                    commit({
                                      ...selectedSection,
                                      content: { ...selectedSection.content, items: updateSectionItems(selectedSection.content.items, index, { ...item, title: event.target.value }) },
                                    })
                                  }
                                  value={item.title}
                                />
                              </Field>
                              <Field label="Description">
                                <TextArea
                                  onChange={(event) =>
                                    commit({
                                      ...selectedSection,
                                      content: { ...selectedSection.content, items: updateSectionItems(selectedSection.content.items, index, { ...item, description: event.target.value }) },
                                    })
                                  }
                                  value={item.description}
                                />
                              </Field>
                              <Button onClick={() => commit({ ...selectedSection, content: { ...selectedSection.content, items: removeSectionItem(selectedSection.content.items, index) } })} type="button" variant="ghost">
                                Remove item
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  ) : null}
                </div>
              </div>
            ) : (
              <div className="rounded-[1.5rem] border border-[var(--line)] bg-white/70 p-5 text-sm leading-7 text-[var(--muted)]">
                Choose a section from the structure panel to start editing.
              </div>
            )}
          </div>
        ) : (
          <div className="rounded-[1.5rem] border border-[var(--line)] bg-white/70 p-5 text-sm leading-7 text-[var(--muted)]">
            Global style controls and section fields become available after the first analysis.
          </div>
        )}
      </div>
    </section>
  );
}
