import { useState } from "react";

interface FieldConfig {
  name: string;
  label: string;
  type: string;
  required?: boolean;
}

interface Props {
  fields: FieldConfig[];
  onSubmit: (data: any) => void;
  initialValues?: any;
  submitText?: string;
}

const DynamicForm = ({
  fields,
  onSubmit,
  initialValues = {},
  submitText = "Submit",
}: Props) => {
  const [formData, setFormData] = useState<any>(initialValues);
  const [errors, setErrors] = useState<any>({});


  const invalidGmailDomains = [
    "gmil.com",
    "gamil.com",
    "gmail.co",
    "gmail.con",
    "gmail.cm",
  ];
const nameRegex = /^[A-Za-z\s]+$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^[6-9]\d{9}$/;

const validate = () => {
  const newErrors: any = {};

  fields.forEach((field) => {
    const value = formData[field.name];

    // Required check
    if (field.required && !value) {
      newErrors[field.name] = `${field.label} is required`;
      return;
    }

    // First Name & Last Name validation
    if (
      (field.name === "firstName" || field.name === "lastName") &&
      value &&
      !nameRegex.test(value)
    ) {
      newErrors[field.name] =
        "Only letters are allowed (no numbers or symbols)";
    }

// Email validation
if (field.name === "email" && value) {
  if (!emailRegex.test(value)) {
    newErrors[field.name] =
      "Please enter a valid email address (e.g. name@gmail.com or name@domain.com)";
    return;
  }

  const domain = value.split("@")[1]?.toLowerCase();

  if (domain && invalidGmailDomains.includes(domain)) {
    newErrors[field.name] =
      "It looks like a Gmail address. Did you mean gmail.com?";
  }
}

    // Phone number validation
    if (field.name === "phone" && value && !phoneRegex.test(value)) {
      newErrors[field.name] =
        "Phone number must be 10 digits and start with 6–9";
    }
  });

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      {fields.map((field) => (
        <div className="mb-3" key={field.name}>
          <label className="form-label fw-semibold">
            {field.label}
            {field.required && (
              <span className="text-danger ms-1">*</span>
            )}
          </label>

          <input
            type={field.type}
            name={field.name}
            value={formData[field.name] || ""}
            onChange={handleChange}
            className={`form-control ${
              errors[field.name] ? "is-invalid" : ""
            }`}
            placeholder={`Enter ${field.label}`}
          />

          {errors[field.name] && (
            <div className="invalid-feedback">
              {errors[field.name]}
            </div>
          )}
        </div>
      ))}

      <button className="btn btn-primary w-100">
        {submitText}
      </button>
    </form>
  );
};

export default DynamicForm;
