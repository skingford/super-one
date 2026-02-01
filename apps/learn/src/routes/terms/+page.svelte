<script lang="ts">
  import LegalPage from "$lib/components/ui/LegalPage.svelte";

  const sections = [
    {
      heading: "Using Learn",
      items: [
        "Be respectful and use the service lawfully.",
        "Do not attempt to access other users' data.",
        "We may suspend accounts for misuse."
      ]
    },
    {
      heading: "Content",
      items: [
        "You own your content and grant us a license to operate the service.",
        "Do not upload illegal or harmful content.",
        "We may remove content that violates policies."
      ]
    },
    {
      heading: "Service changes",
      items: [
        "We may update features or pricing with notice.",
        "Service availability is not guaranteed.",
        "These terms may change over time."
      ]
    }
  ];
</script>

<LegalPage
  title="Terms"
  summary="Key rules for using Learn. This is demo content."
  {sections}
/>
