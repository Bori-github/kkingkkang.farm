export const handleTextarea = (element: HTMLTextAreaElement) => {
  if (element) {
    const { scrollHeight, style } = element;
    style.height = 'auto';
    style.height = `${scrollHeight}px`;
  }
};
