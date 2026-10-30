"use client";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  Info,
  RotateCcw,
} from "lucide-react";
import { services, steps, timeWindows } from "@/content/site";
import { ServiceIcon } from "@/components/icons";
import { localDate, validateStep } from "@/lib/validation";
import { emptyBooking, type Booking, type Errors } from "@/types/booking";

const headings = [
  "Choose your service.",
  "Tell us about your car.",
  "What works for your day?",
  "A few details about you.",
  "Everything look right?",
];
const descriptions = [
  "Choose a sample service to get started.",
  "Share what you know. All vehicle details are optional.",
  "These are preferences, not available appointment slots.",
  "Use sample details. This demo never sends your information.",
  "Review your sample request before completing the demo.",
];
export function BookingForm() {
  const params = useSearchParams();
  const preset = params.get("service") || "";
  const [data, setData] = useState<Booking>({
    ...emptyBooking,
    service: [...services.map((s) => s.id), "unsure"].includes(preset)
      ? preset
      : "",
  });
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<Errors>({});
  const [complete, setComplete] = useState(false);
  const [reviewDraft, setReviewDraft] = useState<Booking | null>(null);
  const [today, setToday] = useState("");
  const heading = useRef<HTMLHeadingElement>(null);
  const form = useRef<HTMLFormElement>(null);
  const moved = useRef(false);
  useEffect(() => {
    // Browser-local date is unavailable during server prerendering.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setToday(localDate());
  }, []);
  useEffect(() => {
    if (moved.current) heading.current?.focus();
  }, [step, complete]);
  function update<K extends keyof Booking>(key: K, value: Booking[K]) {
    setData((previous) => ({ ...previous, [key]: value }));
    setErrors((previous) => ({ ...previous, [key]: undefined }));
  }
  function navigate(next: number) {
    moved.current = true;
    setErrors({});
    setStep(next);
  }
  function editStep(next: number) {
    setReviewDraft({ ...data });
    navigate(next);
  }
  function cancelEdit() {
    if (reviewDraft) setData(reviewDraft);
    setReviewDraft(null);
    navigate(4);
  }
  function submit(event: FormEvent) {
    event.preventDefault();
    const found =
      step === 4
        ? [0, 1, 2, 3].reduce<Errors>(
            (all, index) => ({ ...all, ...validateStep(index, data) }),
            {},
          )
        : validateStep(step, data);
    if (Object.keys(found).length) {
      setErrors(found);
      if (step === 4) {
        const invalidStep = [0, 1, 2, 3].find(
          (index) => Object.keys(validateStep(index, data)).length,
        );
        setStep(invalidStep ?? 0);
        setReviewDraft({ ...data });
      }
      requestAnimationFrame(() =>
        form.current
          ?.querySelector<HTMLElement>(
            'input[aria-invalid="true"], select[aria-invalid="true"], [data-invalid="true"]',
          )
          ?.focus(),
      );
      return;
    }
    moved.current = true;
    if (reviewDraft) {
      setReviewDraft(null);
      setStep(4);
    } else if (step < 4) setStep(step + 1);
    else setComplete(true);
  }
  function field(
    key: "make" | "model" | "year" | "date" | "name" | "email" | "phone",
    label: string,
    options: {
      type?: string;
      placeholder?: string;
      autoComplete?: string;
      required?: boolean;
    } = {},
  ) {
    return (
      <div className="field">
        <label htmlFor={key}>
          {label}
          {!options.required && <span> (optional)</span>}
        </label>
        <input
          id={key}
          name={key}
          type={options.type || "text"}
          value={data[key]}
          onChange={(e) => update(key, e.target.value)}
          placeholder={options.placeholder}
          autoComplete={options.autoComplete}
          required={options.required}
          min={key === "date" ? today : undefined}
          maxLength={key === "year" ? 4 : 120}
          inputMode={key === "year" ? "numeric" : undefined}
          aria-invalid={!!errors[key]}
          aria-describedby={errors[key] ? `${key}-error` : undefined}
        />
        {errors[key] && (
          <p className="field-error" id={`${key}-error`}>
            {errors[key]}
          </p>
        )}
      </div>
    );
  }
  const serviceName =
    services.find((s) => s.id === data.service)?.name || "Not sure yet";
  const summary = [
    { title: "Service", step: 0, rows: [["Selected service", serviceName]] },
    {
      title: "Vehicle",
      step: 1,
      rows: [
        [
          "Vehicle",
          [data.year, data.make, data.model].filter(Boolean).join(" ") ||
            "Not provided",
        ],
        ["Notes", data.notes || "None added"],
      ],
    },
    {
      title: "Preference",
      step: 2,
      rows: [
        [
          "Preferred date",
          data.date
            ? new Date(`${data.date}T12:00:00`).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })
            : "Not selected",
        ],
        ["Time window", data.time],
      ],
    },
    {
      title: "Contact",
      step: 3,
      rows: [
        ["Name", data.name],
        ["Email", data.email],
        ["Phone", data.phone || "Not provided"],
      ],
    },
  ];
  if (complete)
    return (
      <div className="completion">
        <CheckCircle2 size={48} strokeWidth={1.3} aria-hidden="true" />
        <p className="section-kicker">You’ve reached the end of the demo</p>
        <h1 ref={heading} tabIndex={-1}>
          Demo — not submitted
        </h1>
        <p>Demo request only — no appointment has been booked or sent.</p>
        <p className="muted">
          Your sample details stay in this page’s memory and disappear when you
          leave or refresh. No workshop will contact you.
        </p>
        <div className="completion-summary">
          <span>Sample request</span>
          <strong>{serviceName}</strong>
          <span>
            {summary[2].rows[0][1]} · {data.time}
          </span>
        </div>
        <div className="completion-actions">
          <Link className="button" href="/">
            Back to home <ArrowRight size={18} />
          </Link>
          <button
            className="text-link"
            onClick={() => {
              setData({ ...emptyBooking });
              setComplete(false);
              navigate(0);
            }}
          >
            Try again <RotateCcw size={16} aria-hidden="true" />
          </button>
        </div>
      </div>
    );
  return (
    <>
      <Link className="back-link" href="/">
        <ArrowLeft size={16} aria-hidden="true" /> Back to the workshop
      </Link>
      <div className="booking-layout">
        <aside className="booking-sidebar">
          <p className="section-kicker">Appointment request · Demo</p>
          <h1>Request a service</h1>

          <ol className="booking-steps" aria-label="Request progress">
            {steps.map((name, index) => (
              <li
                key={name}
                className={
                  index === step ? "current" : index < step ? "finished" : ""
                }
                aria-current={index === step ? "step" : undefined}
              >
                <span>
                  {index < step ? (
                    <Check size={16} aria-hidden="true" />
                  ) : (
                    index + 1
                  )}
                </span>
                {index < step && !reviewDraft ? (
                  <button
                    onClick={() =>
                      step === 4 ? editStep(index) : navigate(index)
                    }
                  >
                    {name}
                    <span className="sr-only">, edit step</span>
                  </button>
                ) : (
                  name
                )}
              </li>
            ))}
          </ol>
          {data.service && step < 4 && (
            <div className="request-summary">
              <p className="section-kicker">Your request so far</p>
              <dl>
                <div><dt>Service</dt><dd>{serviceName}</dd></div>
                {[data.make, data.model, data.year].some(Boolean) && <div><dt>Vehicle</dt><dd>{[data.year, data.make, data.model].filter(Boolean).join(" ")}</dd></div>}
                {data.date && <div><dt>Preferred date</dt><dd>{summary[2].rows[0][1]}</dd></div>}
                {data.time && <div><dt>Time preference</dt><dd>{data.time}</dd></div>}
              </dl>
            </div>
          )}
          <div className="demo-callout">
            <Info size={19} aria-hidden="true" />
            <p>
              <strong>Local-only demo.</strong> Nothing is booked or sent.
              <span className="demo-detail">
                {" "}
                Your details stay in this page. Please use sample information.
              </span>
            </p>
          </div>
        </aside>
        <div className="booking-panel">
          <div className="form-heading">
            <span className="muted">
              {reviewDraft
                ? `Editing ${steps[step].toLowerCase()}`
                : `Step ${step + 1} of 5`}
            </span>
            <h2 ref={heading} tabIndex={-1}>
              {headings[step]}
            </h2>
            <p>{descriptions[step]}</p>
            {step > 0 && step < 4 && (
              <p className="selected-service">
                <span>Selected service</span>
                <strong>{serviceName}</strong>
              </p>
            )}
          </div>
          <form ref={form} noValidate onSubmit={submit}>
            <p className="validation-status sr-only" role="alert" aria-atomic="true">
              {Object.values(errors).filter(Boolean).length > 0
                ? "Please check the highlighted fields before continuing."
                : ""}
            </p>
            {step === 0 && (
              <fieldset className="service-options" aria-invalid={!!errors.service}>
                <legend className="sr-only">Select a service</legend>
                {[
                  ...services,
                  {
                    id: "unsure",
                    name: "Not sure yet",
                    description: "Describe the concern in the next step.",
                    icon: "diagnostics" as const,
                  },
                ].map((service) => (
                  <label
                    key={service.id}
                    className={`service-option ${data.service === service.id ? "selected" : ""}`}
                  >
                    <input
                      type="radio"
                      name="service"
                      value={service.id}
                      checked={data.service === service.id}
                      onChange={() => update("service", service.id)}
                      data-invalid={!!errors.service}
                      aria-describedby={
                        errors.service ? "service-error" : undefined
                      }
                    />
                    <ServiceIcon name={service.icon} size={22} />
                    <span>{service.name}</span>
                    <span className="radio-indicator" aria-hidden="true">
                      {data.service === service.id && <Check size={13} />}
                    </span>
                  </label>
                ))}
                {errors.service && (
                  <p className="field-error" id="service-error">
                    {errors.service}
                  </p>
                )}
              </fieldset>
            )}
            {step === 1 && (
              <div className="fields">
                <div className="field-row vehicle-row">
                  {field("make", "Make", { placeholder: "e.g. Toyota" })}
                  {field("model", "Model", { placeholder: "e.g. Corolla" })}
                  {field("year", "Year", { placeholder: "e.g. 2020" })}
                </div>
                <div className="field">
                  <label htmlFor="notes">
                    What have you noticed? <span>(optional)</span>
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    rows={4}
                    maxLength={1500}
                    value={data.notes}
                    onChange={(e) => update("notes", e.target.value)}
                    placeholder="A warning light, a new sound, or just time for a check…"
                  />
                  <small>Please don’t include sensitive information.</small>
                </div>
              </div>
            )}
            {step === 2 && (
              <div className="fields">
                {field("date", "Preferred date", {
                  type: "date",
                  required: true,
                })}
                <div className="field">
                  <label htmlFor="time">Preferred time window</label>
                  <select
                    id="time"
                    value={data.time}
                    onChange={(e) => update("time", e.target.value)}
                    required
                    aria-invalid={!!errors.time}
                    aria-describedby={errors.time ? "time-error" : undefined}
                  >
                    <option value="">Select a preference</option>
                    {timeWindows.map((time) => (
                      <option key={time}>{time}</option>
                    ))}
                  </select>
                  {errors.time && (
                    <p className="field-error" id="time-error">
                      {errors.time}
                    </p>
                  )}
                </div>
                <div className="inline-note">
                  <Info size={19} aria-hidden="true" />
                  <p>
                    No availability is checked. A real workshop would need to
                    confirm your requested date and time separately.
                  </p>
                </div>
              </div>
            )}
            {step === 3 && (
              <div className="fields">
                {field("name", "Your name", {
                  placeholder: "e.g. Alex Sample",
                  autoComplete: "name",
                  required: true,
                })}
                {field("email", "Email address", {
                  type: "email",
                  placeholder: "e.g. alex@example.com",
                  autoComplete: "email",
                  required: true,
                })}
                {field("phone", "Phone number", {
                  type: "tel",
                  autoComplete: "tel",
                  placeholder: "Use a sample number, or leave blank",
                })}
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    required
                    checked={data.consent}
                    onChange={(e) => update("consent", e.target.checked)}
                    aria-invalid={!!errors.consent}
                    aria-describedby={
                      errors.consent ? "consent-error" : undefined
                    }
                  />
                  <span>
                    I understand this is a local-only demo. No request will be
                    sent and no appointment will be booked.
                  </span>
                </label>
                {errors.consent && (
                  <p className="field-error" id="consent-error">
                    {errors.consent}
                  </p>
                )}
              </div>
            )}
            {step === 4 && (
              <div className="review">
                {summary.map((group) => (
                  <section key={group.title}>
                    <div className="review-heading">
                      <h3>{group.title}</h3>
                      <button
                        type="button"
                        onClick={() => editStep(group.step)}
                        aria-label={`Edit ${group.title.toLowerCase()}`}
                      >
                        Edit
                      </button>
                    </div>
                    <dl>
                      {group.rows.map(([label, value]) => (
                        <div key={label}>
                          <dt>{label}</dt>
                          <dd>{value}</dd>
                        </div>
                      ))}
                    </dl>
                  </section>
                ))}
                <div className="inline-note">
                  <Info size={19} aria-hidden="true" />
                  <p>
                    Completing this demo only shows a local confirmation.
                    Nothing will be submitted.
                  </p>
                </div>
              </div>
            )}
            <div className="form-actions">
              {reviewDraft ? (
                <button
                  className="text-link"
                  type="button"
                  onClick={cancelEdit}
                >
                  Cancel edit
                </button>
              ) : (
                step > 0 && (
                  <button
                    className="text-link"
                    type="button"
                    onClick={() => navigate(step - 1)}
                  >
                    <ArrowLeft size={17} aria-hidden="true" /> Back
                  </button>
                )
              )}
              <button type="submit" className="button">
                {reviewDraft
                  ? "Save changes"
                  : step === 4
                    ? "Complete demo"
                    : "Continue"}
                <ArrowRight size={18} aria-hidden="true" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
