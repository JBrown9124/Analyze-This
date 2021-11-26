import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";


interface Props {
  resources: [{ name: string; url: string }];
}
export default function AnalysisResults({ resources }: Props) {
  function openInNewTab(url: string) {
    const win = window.open(url, "_blank")?.focus();
    return win;
  }
  return (
    <>
  
        <Typography variant="h3">Resources</Typography>
        {resources.map((resource) => (
          <Typography variant="h3">
            <div>
              <Link type="button" onClick={() => openInNewTab(resource.url)}>
                {" "}
                {resource.name}
              </Link>
            </div>
          </Typography>
        ))}
  
    </>
  );
}
