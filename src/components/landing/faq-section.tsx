import { ArrowUpRight } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionLabel } from "@/components/landing/feature-sections";
import { site } from "@/lib/site";

const questions = [
  {
    question: "What exactly is Collabute?",
    answer:
      "Collabute is an AI teammate for product teams. It brings together the context from your meetings, conversations, and project tools, then helps turn that context into clear decisions, tasks, and follow-ups.",
  },
  {
    question: "How is this different from an AI notetaker?",
    answer:
      "A notetaker helps you remember a meeting. Collabute connects the meeting to everything that happens around it: the discussion in Slack, the ticket in Linear, and the decision behind both. That shared context helps your team follow through after the call ends.",
  },
  {
    question: "Will a bot join our meetings?",
    answer:
      "No bot needs to join your calls. Collabute captures meeting context through its desktop app, so your team can keep its usual meeting setup.",
  },
  {
    question: "Does it work with the tools we already use?",
    answer:
      "Yes. Collabute connects with tools including Slack, Linear, Jira, Notion, Google Calendar, and Microsoft Teams. Available integrations depend on your plan. Explore the documentation for setup details.",
  },
  {
    question: "Is our team’s data used to train AI models?",
    answer:
      "Your team’s data is not used to train external models. Collabute also offers on-premise deployment options for teams with specific infrastructure requirements. Contact the team to discuss your security needs.",
  },
  {
    question: "Can I try it before bringing in my team?",
    answer:
      "Absolutely. The Free plan includes one seat, 30 meetings, and 100 AI actions per month. When you’re ready to connect more of your team’s workflow, Pro includes a 14-day free trial.",
  },
];

export function FaqSection() {
  return (
    <section id="faq" className="section-frame faq-section">
      <div>
        <SectionLabel number="05">A FEW MORE THINGS</SectionLabel>
        <h2>
          Good questions.
          <br />
          <span className="serif-accent">Clear answers.</span>
        </h2>
        <p>Still curious about something?</p>
        <a className="text-link" href={site.docs}>
          Find it in the docs
          <ArrowUpRight />
        </a>
      </div>
      <Accordion
        type="single"
        collapsible
        defaultValue="question-0"
        className="faq-list"
      >
        {questions.map((item, index) => (
          <AccordionItem key={item.question} value={`question-${index}`}>
            <AccordionTrigger>{item.question}</AccordionTrigger>
            <AccordionContent>{item.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
