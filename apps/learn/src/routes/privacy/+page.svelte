<script lang="ts">
  import LegalPage from "$lib/components/ui/LegalPage.svelte";

  const sections = [
    {
      heading: "What we collect",
      items: [
        "Basic account data like name and email when you sign up.",
        "Usage events to improve features and reliability.",
        "Device and browser details for performance and security."
      ]
    },
    {
      heading: "How we use it",
      items: [
        "Provide the Learn experience and personalize content.",
        "Monitor performance and prevent abuse.",
        "Send important service updates."
      ]
    },
    {
      heading: "Your choices",
      items: [
        "Access and update your profile information.",
        "Export or delete your data on request.",
        "Opt out of non-essential communications."
      ]
    }
  ];
</script>

<LegalPage
  title="Privacy"
  summary="A concise overview of how Learn handles your data. This is demo content."
  {sections}
/>
