<script lang="ts">
  import LegalPage from "$lib/components/ui/LegalPage.svelte";

  const sections = [
    {
      heading: "Getting started",
      items: [
        "Create a workspace and set learning goals.",
        "Use templates to plan study sessions.",
        "Track progress with check-ins."
      ]
    },
    {
      heading: "Core features",
      items: [
        "Knowledge base for notes and insights.",
        "Interview practice with spaced review.",
        "Study planner with reminders."
      ]
    },
    {
      heading: "Tips",
      items: [
        "Keep entries short and actionable.",
        "Review weekly to reinforce memory.",
        "Use tags to stay organized."
      ]
    }
  ];
</script>

<LegalPage
  title="Docs"
  summary="Quick guidance to help you navigate Learn. This is demo content."
  {sections}
/>
