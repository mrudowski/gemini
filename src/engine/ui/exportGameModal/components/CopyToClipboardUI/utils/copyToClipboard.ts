const copyToClipboard = (accessCode: string, onSuccessCallback: (success: boolean) => void) => {
  navigator.clipboard
    .writeText(accessCode)
    .then(() => {
      onSuccessCallback(true);
    })
    .catch(err => {
      // should not happen
      console.error('Could not copy text to clipboard', err);
    });
};

export default copyToClipboard;
