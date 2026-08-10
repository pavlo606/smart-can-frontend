export interface FormPropsIntarface<T> {
  editingItem?: T
  onSuccess?: () => void
  onError?: (err: Error) => void
}