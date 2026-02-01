<script lang="ts">
  import LegalPage from "$lib/components/ui/LegalPage.svelte";

  const sections = [
    {
      heading: "Protection",
      items: [
        "Encrypted traffic for data in transit.",
        "Regular dependency updates and vulnerability scans.",
        "Access controls for internal systems."
      ]
    },
    {
      heading: "Reliability",
      items: [
        "Monitoring for uptime and performance.",
        "Backups and recovery procedures.",
        "Incident response playbooks."
      ]
    },
    {
      heading: "Report issues",
      items: [
        "Email security@learn.example for responsible disclosures.",
        "We acknowledge reports and provide status updates.",
        "Validated issues are prioritized for fixes."
      ]
    }
  ];
</script>

<LegalPage
  title="Security"
  summary="A short summary of our security practices. This is demo content."
  {sections}
/>
