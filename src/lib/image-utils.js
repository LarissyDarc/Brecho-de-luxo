export function buildResponsiveImage(
  url,
  widths = [480, 768, 1024, 1200, 1600],
) {
  if (!url) {
    return { src: url, srcSet: url };
  }

  try {
    const imageUrl = new URL(url);
    const params = imageUrl.searchParams;
    const auto = params.get("auto") || "format";
    const fit = params.get("fit") || "crop";
    const q = params.get("q") || "85";
    const fm = params.get("fm");
    const baseUrl = `${imageUrl.origin}${imageUrl.pathname}`;
    const common = new URLSearchParams({ auto, fit, q });
    if (fm) {
      common.set("fm", fm);
    }

    const srcSet = widths
      .map((width) => `${baseUrl}?${common.toString()}&w=${width} ${width}w`)
      .join(", ");
    const src = `${baseUrl}?${common.toString()}&w=${widths[widths.length - 1]}`;

    return { src, srcSet };
  } catch (error) {
    return { src: url, srcSet: url };
  }
}
