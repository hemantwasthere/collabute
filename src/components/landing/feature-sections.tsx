import {
  ArrowRight,
  ArrowUpRight,
  AudioLines,
  Check,
  CheckCheck,
  Fingerprint,
  GitBranch,
  LockKeyhole,
  MessageSquare,
  Radio,
  ShieldCheck,
  Sparkles,
  Workflow,
} from "lucide-react";
import { BrandMark } from "@/components/brand-mark";
import { ToolIcon, type ToolName } from "@/components/landing/tool-icon";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";

export function SectionLabel({
  number,
  children,
}: {
  number: string;
  children: React.ReactNode;
}) {
  return (
    <p className="section-label">
      <span>[ {number} ]</span>
      {children}
    </p>
  );
}

export function ToolStrip() {
  const tools: { name: ToolName; label: string }[] = [
    { name: "slack", label: "Slack" },
    { name: "linear", label: "Linear" },
    { name: "notion", label: "Notion" },
    { name: "meet", label: "Google Meet" },
    { name: "teams", label: "Microsoft Teams" },
  ];
  return (
    <section className="tool-strip" aria-label="Connected tools">
      <p>A NEW TEAMMATE. RIGHT AT HOME IN YOUR STACK.</p>
      <div>
        {tools.map((tool) => (
          <span key={tool.name}>
            <ToolIcon name={tool.name} className="size-5" />
            {tool.label}
          </span>
        ))}
      </div>
    </section>
  );
}

export function HowItWorks() {
  return (
    <section id="how-it-works" className="section-frame workflow-section">
      <SectionLabel number="01">FROM CONTEXT TO MOMENTUM</SectionLabel>
      <div className="section-heading">
        <h2>
          Good conversations deserve
          <br />
          <span className="serif-accent">great follow-through.</span>
        </h2>
        <p>
          The meeting ends. The work doesn’t.
          <br />
          Collabute connects the dots so your team
          <br className="hidden sm:block" /> can keep moving.
        </p>
      </div>
      <div className="workflow-grid">
        <article>
          <div className="workflow-visual capture-visual">
            <span className="mini-message">
              <ToolIcon name="slack" className="size-3.5" />
              <span>“Let’s make this the priority.”</span>
            </span>
            <div className="waveform">
              <AudioLines />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>
            <span className="mini-message bottom-message">
              <VideoIcon />
              <span>Product sync · Today</span>
              <i className="status-dot" />
            </span>
          </div>
          <div className="step-number">
            01 <span /> LISTEN
          </div>
          <h3>In the loop. Without the effort.</h3>
          <p>
            Bring meetings and messages into one shared memory. Keep the details
            without taking another note.
          </p>
        </article>
        <article>
          <div className="workflow-visual connect-visual">
            <div className="connection-line" />
            <span className="connect-node node-one">
              <MessageSquare />
            </span>
            <span className="connect-node node-two">
              <GitBranch />
            </span>
            <span className="connect-node node-three">
              <ToolIcon name="linear" />
            </span>
            <span className="connect-core">
              <BrandMark />
            </span>
            <span className="context-tag">
              A little more context. A lot more clarity.
            </span>
          </div>
          <div className="step-number">
            02 <span /> UNDERSTAND
          </div>
          <h3>The whole picture, connected.</h3>
          <p>
            Link what was said to what’s being built. Surface the decisions,
            dependencies, and people that matter.
          </p>
        </article>
        <article>
          <div className="workflow-visual action-visual">
            <div className="mini-task">
              <div>
                <span className="task-check">
                  <Check />
                </span>
                <span>Create onboarding tickets</span>
              </div>
              <span className="task-done">Done</span>
            </div>
            <div className="mini-task">
              <div>
                <span className="task-check">
                  <Check />
                </span>
                <span>Follow up with Maya</span>
              </div>
              <span className="task-done">Done</span>
            </div>
            <div className="mini-task">
              <div>
                <span className="task-check">
                  <Check />
                </span>
                <span>Connect launch milestone</span>
              </div>
              <span className="task-done">Done</span>
            </div>
          </div>
          <div className="step-number">
            03 <span /> FOLLOW THROUGH
          </div>
          <h3>Next steps. Already a step ahead.</h3>
          <p>
            Turn intent into tickets and timely follow-ups. Catch the loose ends
            before they become the next blocker.
          </p>
        </article>
      </div>
    </section>
  );
}

function VideoIcon() {
  return <Radio className="size-3.5 text-primary" />;
}

export function Features() {
  return (
    <section id="features" className="section-frame features-section">
      <SectionLabel number="02">A TEAMMATE, NOT ANOTHER TAB</SectionLabel>
      <div className="section-heading">
        <h2>
          Less “any updates?”
          <br />
          <span className="serif-accent">More actual progress.</span>
        </h2>
        <p>
          All the follow-through you need.
          <br />
          None of the busywork you don’t.
        </p>
      </div>
      <div className="feature-grid">
        <article className="feature-card feature-wide">
          <div className="feature-copy">
            <span className="feature-icon">
              <Sparkles />
            </span>
            <h3>
              From “we should”
              <br />
              to ready to ship.
            </h3>
            <p>
              Decisions become well-scoped tickets, with the right owner and the
              context to get started.
            </p>
            <a href="#product" className="text-link">
              See the workflow
              <ArrowUpRight />
            </a>
          </div>
          <div className="feature-ticket">
            <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
              <ToolIcon
                name="linear"
                className="size-4 text-[var(--accent-ink)]"
              />
              PRODUCT / ONBOARDING<span className="ml-auto">···</span>
            </div>
            <h4>Build onboarding empty states</h4>
            <p>
              Give new workspaces a clear starting point.
              <br />
              Based on today’s product sync.
            </p>
            <div className="ticket-property">
              <span>Status</span>
              <span>
                <i className="yellow-ring" />
                In progress
              </span>
            </div>
            <div className="ticket-property">
              <span>Assignee</span>
              <span>
                <i className="mini-avatar">MK</i>Maya Kim
              </span>
            </div>
            <div className="ticket-property">
              <span>Due date</span>
              <span>Friday, October 9</span>
            </div>
            <div className="ticket-context">
              <BrandMark className="size-3.5" />
              The task. The owner. The why.
              <Check className="ml-auto size-3.5" />
            </div>
          </div>
        </article>
        <article className="feature-card feature-alert">
          <span className="feature-icon">
            <Workflow />
          </span>
          <h3>
            Small blockers.
            <br />
            Caught before they grow.
          </h3>
          <p>
            A changed timeline, an open dependency, a missing owner. Get a
            heads-up while there’s still time.
          </p>
          <div className="alert-illustration">
            <span className="alert-symbol">!</span>
            <div>
              <strong>One thing before Friday</strong>
              <p>
                The events API is blocking design.
                <br />
                <span>Alex might have the context.</span>
              </p>
            </div>
            <ArrowUpRight className="ml-auto size-4" />
          </div>
        </article>
        <article className="feature-card feature-memory">
          <span className="feature-icon">
            <GitBranch />
          </span>
          <h3>Never lose the “why.”</h3>
          <p>
            Trace every decision back to the conversation that started it. Your
            team’s memory, with receipts.
          </p>
          <div className="memory-trail">
            <span>
              <MessageSquare />
              Conversation
            </span>
            <ArrowRight />
            <span>
              <GitBranch />
              Decision
            </span>
            <ArrowRight />
            <span>
              <CheckCheck />
              Action
            </span>
          </div>
        </article>
        <article className="feature-card feature-answer">
          <div>
            <span className="feature-icon">
              <MessageSquare />
            </span>
            <h3>Ask once. Get the full story.</h3>
            <p>
              Skip the scroll through five different tools.
              <br />
              Get answers grounded in your team’s work.
            </p>
          </div>
          <div className="answer-illustration">
            <span>
              Why did we move the launch?
              <ArrowUpRight className="size-3.5" />
            </span>
            <p>
              <BrandMark className="size-4" />
              <span>
                To give engineering time to ship the events API.
                <small>↳ Product sync · 2 connected sources</small>
              </span>
            </p>
          </div>
        </article>
      </div>
    </section>
  );
}

export function Integrations() {
  const tools: { name: ToolName; label: string; type: string }[] = [
    { name: "slack", label: "Slack", type: "THE CONVERSATIONS" },
    { name: "linear", label: "Linear", type: "THE WORK" },
    { name: "notion", label: "Notion", type: "THE KNOWLEDGE" },
    { name: "meet", label: "Google Meet", type: "THE DECISIONS" },
    { name: "teams", label: "Teams", type: "THE TEAM" },
    { name: "calendar", label: "Google Calendar", type: "THE PLAN" },
  ];
  return (
    <section id="integrations" className="section-frame integrations-section">
      <SectionLabel number="03">BUILT AROUND YOUR TEAM</SectionLabel>
      <div className="integrations-layout">
        <div>
          <h2>
            Your tools.
            <br />
            Your people.
            <br />
            <span className="serif-accent">Finally, connected.</span>
          </h2>
          <p>
            Great teams already have their rhythm.
            <br />
            Collabute fits right in, connecting the tools
            <br className="hidden sm:block" /> you use with the work that
            matters.
          </p>
          <a href={site.docs} className="text-link">
            Explore integrations
            <ArrowUpRight />
          </a>
          <div className="integration-note">
            <Check className="size-3.5" />
            Your workflow stays yours.
          </div>
        </div>
        <div className="integration-grid">
          {tools.map((tool) => (
            <div className="integration-tile" key={tool.name}>
              <ToolIcon name={tool.name} className="size-8" />
              <strong>{tool.label}</strong>
              <span>{tool.type}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Security() {
  return (
    <section className="security-section section-frame">
      <div className="security-title">
        <ShieldCheck className="size-7" />
        <div>
          <p className="eyebrow">YOUR CONTEXT. YOUR CONTROL.</p>
          <h2>Trust is part of the product.</h2>
        </div>
      </div>
      <div className="security-grid">
        <div>
          <LockKeyhole />
          <h3>Private by design</h3>
          <p>
            Your conversations aren’t training data.
            <br />
            Your team’s knowledge stays yours.
          </p>
        </div>
        <div>
          <Fingerprint />
          <h3>Built for your environment</h3>
          <p>
            On-premise deployment options
            <br />
            for teams that need more control.
          </p>
        </div>
        <div>
          <CheckCheck />
          <h3>You’re in the driver’s seat</h3>
          <p>
            Review the next step, keep the context,
            <br />
            and decide what moves forward.
          </p>
        </div>
      </div>
    </section>
  );
}

export function ClosingCta() {
  return (
    <section className="closing-cta">
      <div className="cta-grid" aria-hidden="true" />
      <BrandMark className="relative size-10 text-[var(--accent-ink)]" />
      <p className="eyebrow relative mt-7 text-[var(--accent-ink)]">
        THE NEXT CHAPTER OF TEAMWORK
      </p>
      <h2>
        Big ideas.
        <br />
        No loose ends.
      </h2>
      <p className="cta-description">
        Meet the teammate that turns your team’s
        <br className="hidden sm:block" /> collective context into forward
        motion.
      </p>
      <Button asChild variant="light" size="lg">
        <a href={site.signup}>
          Put your context to work
          <ArrowUpRight />
        </a>
      </Button>
      <span className="cta-footnote">Start free. Find your flow.</span>
      <span className="cta-coordinate left">CONTEXT → CLARITY</span>
      <span className="cta-coordinate right">CLARITY → ACTION</span>
    </section>
  );
}
