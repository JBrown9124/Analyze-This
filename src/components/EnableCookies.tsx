import { useState } from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
interface Props {
  isCookiesEnabled: (arg: boolean) => void;
}

export default function EnableCookies({ isCookiesEnabled }: Props) {
  const [showSnack, setShowSnack] = useState(true);
  const handleAccept = (): void => {
    isCookiesEnabled(true);
    setShowSnack(false);
  };
  const handleDecline = (): void => {
    isCookiesEnabled(false);
    setShowSnack(false);
  };
  const action = (
    <>
      <Button onClick={() => handleAccept()} color="secondary" size="small">
        Accept
      </Button>
      <Button onClick={() => handleDecline()} color="secondary" size="small">
        Decline
      </Button>
    </>
  );

  return (
    <>
      <Snackbar
        open={showSnack}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        message="This website uses cookies to improve user experience."
        action={action}
      />
    </>
  );
}
