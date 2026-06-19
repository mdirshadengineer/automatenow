# Taste (Continuously Learned by [CommandCode][cmd])

[cmd]: https://commandcode.ai/

# validation
- Use arktype for form schema validation, consistent with the existing env.ts pattern. Confidence: 0.65

# supabase
- Avoid experimental Supabase features (e.g., passkey/WebAuthn) to prevent breaking changes in production. Confidence: 0.65

# error-handling
- Use Sentry for error handling and reporting throughout the application. Confidence: 0.65

# components
- Use Radix Nova Field primitives (Field, FieldLabel, FieldContent, FieldError) for form components instead of raw Label/Input wrappers. Confidence: 0.70

