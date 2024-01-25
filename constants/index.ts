export const headerLinks = [
  {
    label: 'Home',
    route: '/',
  },
  {
    label: 'Create Event',
    route: '/events/create',
  },
  {
    label: 'My Profile',
    route: '/profile',
  },
]

export const eventDefaultValues = {
  title: '',
  description: '',
  imageUrl: '',
  createdAt: new Date(),
  genre: '',
  categoryId: '',
  price: '',
  isFree: false,
  url: '',
}
