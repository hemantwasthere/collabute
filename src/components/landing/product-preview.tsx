"use client";

import * as React from "react";
import {
  ArrowDown,
  ArrowRight,
  AudioLines,
  Check,
  ChevronDown,
  Circle,
  CornerDownRight,
  GitBranch,
  Hash,
  Layers3,
  Link2,
  MessageSquare,
  MoreHorizontal,
  Sparkles,
  Video,
} from "lucide-react";
import { BrandMark } from "@/components/brand-mark";
import { ToolIcon } from "@/components/landing/tool-icon";
import { cn } from "@/lib/utils";

const views = [
  { id: "overview", label: "Your team's context", icon: Layers3 },
  { id: "actions", label: "Actions, already in motion", icon: Sparkles },
  { id: "decisions", label: "Decisions that stick", icon: GitBranch },
] as const;

type View = (typeof views)[number]["id"];

export function ProductPreview() {
  const [view, setView] = React.useState<View>("overview");
  const [approved, setApproved] = React.useState(false);

  function handleTabKey(
    event: React.KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) {
    let next = index;
    if (event.key === "ArrowRight") next = (index + 1) % views.length;
    else if (event.key === "ArrowLeft")
      next = (index + views.length - 1) % views.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = views.length - 1;
    else return;
    event.preventDefault();
    setView(views[next].id);
    document.getElementById(`preview-tab-${views[next].id}`)?.focus();
  }

  return (
    <div className="product-showcase" id="product">
      <div
        className="preview-tabs"
        role="tablist"
        aria-label="Explore Collabute"
      >
        {views.map(({ id, label, icon: Icon }, index) => (
          <button
            key={id}
            id={`preview-tab-${id}`}
            type="button"
            role="tab"
            aria-selected={view === id}
            aria-controls={`preview-panel-${id}`}
            tabIndex={view === id ? 0 : -1}
            onKeyDown={(event) => handleTabKey(event, index)}
            onClick={() => setView(id)}
            className={cn("preview-tab", view === id && "active")}
          >
            <Icon className="size-3.5" />
            {label}
          </button>
        ))}
      </div>
      <div
        className="preview-window"
        role="tabpanel"
        id={`preview-panel-${view}`}
        aria-labelledby={`preview-tab-${view}`}
        tabIndex={0}
      >
        <div className="preview-toolbar">
          <div className="flex items-center gap-3">
            <span className="window-dots">
              <i />
              <i />
              <i />
            </span>
            <span className="hidden h-4 w-px bg-border sm:block" />
            <BrandMark className="size-4 text-primary" />
            <span className="font-medium">Acme workspace</span>
            <ChevronDown className="size-3 text-muted-foreground" />
          </div>
          <span className="flex items-center gap-2 text-[10px] text-muted-foreground">
            <span className="status-dot" />
            All caught up
            <span className="preview-label">INTERACTIVE PREVIEW</span>
          </span>
        </div>
        <div className="preview-content">
          <aside className="context-sources">
            <div className="preview-heading">
              <span>WHERE WORK HAPPENS</span>
              <span>01—03</span>
            </div>
            <div
              className={cn(
                "source-card",
                view === "overview" && "source-active",
              )}
            >
              <div className="source-title">
                <span className="source-icon bg-[var(--secondary)]">
                  <Video className="size-4 text-[var(--accent-ink)]" />
                </span>
                <strong>Product sync</strong>
                <span className="source-time">9:30 AM</span>
              </div>
              <p>
                “Let’s ship the new onboarding Friday. Maya will take the empty
                states.”
              </p>
              <div className="source-footer">
                <span className="avatar-stack">
                  <i>JL</i>
                  <i>MK</i>
                  <i>AS</i>
                </span>
                <span>3 teammates · 24 min</span>
                <AudioLines className="ml-auto size-4 text-primary/50" />
              </div>
            </div>
            <div
              className={cn(
                "source-card",
                view === "decisions" && "source-active",
              )}
            >
              <div className="source-title">
                <ToolIcon name="slack" className="size-4" />
                <strong>#design</strong>
                <span className="source-time">10:42 AM</span>
              </div>
              <p>
                <span className="font-medium text-foreground">Maya</span> Empty
                states are ready ✨<br />
                Just waiting on the events API.
              </p>
              <div className="source-footer">
                <MessageSquare className="size-3" />
                <span>4 replies</span>
                <span className="ml-auto text-primary">New context</span>
              </div>
            </div>
            <div
              className={cn(
                "source-card compact-source",
                view === "actions" && "source-active",
              )}
            >
              <div className="source-title">
                <ToolIcon
                  name="linear"
                  className="size-4 text-[var(--accent-ink)]"
                />
                <strong>Onboarding v2</strong>
                <span className="source-time">LIN-128</span>
              </div>
              <div className="mt-3 flex items-center gap-2 text-[11px] text-muted-foreground">
                <Circle className="size-3 text-[var(--accent-ink)]" />
                <span>In progress</span>
                <span className="ml-auto">Due Friday</span>
              </div>
            </div>
          </aside>
          <div className="context-bridge" aria-hidden="true">
            <svg viewBox="0 0 170 350" preserveAspectRatio="none">
              <path d="M0 82H25Q50 82 50 108V149Q50 175 75 175H170M0 207H28Q50 207 50 190V184Q50 175 75 175M0 306H25Q50 306 50 280V201Q50 175 75 175" />
              <circle className="flow-dot flow-dot-first" r="3" />
              <circle className="flow-dot flow-dot-second" r="3" />
            </svg>
            <div className="bridge-mark">
              <BrandMark className="size-7" />
            </div>
            <span>
              CONNECTED
              <br />
              WITH CONTEXT
            </span>
          </div>
          <section className="context-output" aria-live="polite">
            <div className="preview-heading">
              <span>WHAT MOVES FORWARD</span>
              <Sparkles className="size-3.5 text-primary" />
            </div>
            <div className="output-greeting">
              <span className="flex size-7 items-center justify-center rounded-full bg-[var(--secondary)]">
                <BrandMark className="size-4 text-primary" />
              </span>
              <div>
                <strong>One step ahead.</strong>
                <p>Here’s what needs your attention.</p>
              </div>
              <MoreHorizontal className="ml-auto size-4 text-muted-foreground" />
            </div>
            {view === "overview" && (
              <>
                <div className="insight-card">
                  <div className="insight-label">
                    <span className="status-dot" />
                    DECISION CAPTURED
                    <span className="ml-auto text-muted-foreground">
                      just now
                    </span>
                  </div>
                  <h3>Onboarding v2 ships Friday</h3>
                  <p>
                    Empty states are owned by Maya. Connected to the launch
                    milestone in Linear.
                  </p>
                  <div className="evidence">
                    <Link2 className="size-3" />
                    Product sync
                    <ArrowRight className="size-3" />
                    <Hash className="size-3" />
                    design<span className="ml-auto">2 sources</span>
                  </div>
                </div>
                <div className="blocker-note">
                  <span className="blocker-dot" />
                  <div>
                    <strong>A small blocker, caught early.</strong>
                    <p>The events API is holding up design handoff.</p>
                  </div>
                  <CornerDownRight className="ml-auto size-4 shrink-0" />
                </div>
                <div className="preview-summary">
                  <Check className="size-3.5" />
                  Context connected. Nothing falls through.
                </div>
              </>
            )}
            {view === "actions" && (
              <>
                <div className="insight-card">
                  <div className="insight-label">
                    <ToolIcon name="linear" className="size-3" />
                    {approved
                      ? "ADDED TO SAMPLE WORKSPACE"
                      : "READY FOR YOUR REVIEW"}
                  </div>
                  <h3>Finish onboarding empty states</h3>
                  <p>
                    Implement the approved designs. Coordinate with engineering
                    on the events API.
                  </p>
                  <div className="ticket-meta">
                    <span>
                      <i className="mini-avatar">MK</i>Maya
                    </span>
                    <span>Due Friday</span>
                    <span>Onboarding v2</span>
                  </div>
                  <button
                    className={cn("approve-button", approved && "approved")}
                    onClick={() => setApproved(!approved)}
                  >
                    {approved ? (
                      <>
                        <Check className="size-3.5" />
                        Approved in preview
                        <span className="ml-auto underline">Reset</span>
                      </>
                    ) : (
                      <>
                        <Check className="size-3.5" />
                        Approve sample ticket
                        <ArrowRight className="ml-auto size-3.5" />
                      </>
                    )}
                  </button>
                </div>
                <div className="preview-summary">
                  <Check className="size-3.5" />
                  You stay in control of what happens next.
                </div>
              </>
            )}
            {view === "decisions" && (
              <>
                <div className="insight-card">
                  <div className="insight-label">
                    <GitBranch className="size-3" />
                    THE WHY, ALONGSIDE THE WHAT
                  </div>
                  <h3>Why are we launching Friday?</h3>
                  <p>
                    The team agreed to validate the new flow before next week’s
                    customer onboarding.
                  </p>
                  <div className="decision-trail">
                    <span>
                      <Video className="size-3" />
                      Product sync<small>Decision made</small>
                    </span>
                    <ArrowDown className="size-3 text-muted-foreground" />
                    <span>
                      <ToolIcon name="slack" className="size-3" />
                      #design<small>Design confirmed</small>
                    </span>
                    <ArrowDown className="size-3 text-muted-foreground" />
                    <span>
                      <ToolIcon name="linear" className="size-3" />
                      Onboarding v2<small>Work connected</small>
                    </span>
                  </div>
                </div>
                <div className="preview-summary">
                  <Check className="size-3.5" />
                  Every answer has a trail back to the source.
                </div>
              </>
            )}
          </section>
        </div>
        <div className="preview-bottom">
          <span>
            <span className="status-dot" />
            Your context stays connected
          </span>
          <span>
            Meetings → Decisions → Action
            <ArrowUpRightIcon />
          </span>
        </div>
      </div>
      <div className="preview-caption">
        <span>LESS COPY-PASTE. MORE FORWARD MOTION.</span>
        <span>YOUR TEAM, WITH FOLLOW-THROUGH. ↗</span>
      </div>
    </div>
  );
}

function ArrowUpRightIcon() {
  return (
    <svg
      width="11"
      height="11"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden="true"
    >
      <path d="M2 10 10 2M2 2h8v8" stroke="currentColor" />
    </svg>
  );
}
