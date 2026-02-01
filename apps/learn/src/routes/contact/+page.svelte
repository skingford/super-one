<script lang="ts">
  import LegalPage from "$lib/components/ui/LegalPage.svelte";

  const sections = [
    {
      heading: "General",
      items: [
        "Email: hello@learn.example",
        "Response time: 1-2 business days",
        "Include your account email for faster help"
      ]
    },
    {
      heading: "Support",
      items: [
        "Report bugs with steps to reproduce",
        "Attach screenshots when possible",
        "Use clear titles for faster routing"
      ]
    },
    {
      heading: "Partnerships",
      items: [
        "Tell us about your audience and goals",
        "We review proposals weekly",
        "We reply to qualified requests only"
      ]
    }
  ];
</script>

<LegalPage
  title="Contact"
  summary="Reach out for support, partnerships, or feedback. This is demo content."
  {sections}
/>
