const debounce = (delay: number, fn: Function) => {
  let timer: undefined | ReturnType<typeof setTimeout>;

  return (...args: any[]) => {
    clearTimeout(timer);

    timer = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};

export const useResizeObserver = (
  element: Ref<HTMLElement | null> | HTMLElement
) => {
  const width = ref(0);
  const height = ref(0);

  onMounted(() => {
    const taget = toValue(element);

    if (!taget) return;

    const updateSize = debounce(100, (entries: ResizeObserverEntry[]) => {
      const { width: newWidth, height: newHeight } = entries[0].contentRect;

      width.value = newWidth;
      height.value = newHeight;
    });

    const observer = new ResizeObserver(updateSize);

    observer.observe(taget);

    onBeforeUnmount(() => {
      observer.disconnect();
    });
  });

  return { width, height };
};
