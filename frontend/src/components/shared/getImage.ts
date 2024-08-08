'use server';
import { getPlaiceholder } from 'plaiceholder';
export const getImage = async (src: string | null) => {
  if (!src)
    return {
      base64: '',
    };
  let buffer;
  try {
    buffer = await fetch(src).then(async (res) =>
      Buffer.from(await res.arrayBuffer()),
    );
  } catch (e) {
    return {
      base64: '',
    };
  }

  const {
    metadata: { height, width },
    ...plaiceholder
  } = await getPlaiceholder(buffer, { size: 10 });

  return {
    ...plaiceholder,
    img: { src, height, width },
  };
};
