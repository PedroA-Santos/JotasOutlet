export function cloudinary(path: string) {
  return `https://res.cloudinary.com/deo14unga/image/upload/f_auto,q_auto/${path.replace(/^\/+/, "")}`;
}