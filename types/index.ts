// ====== USER PARAMS

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      accessToken?: string; // Add the accessToken property here
    };
  }
}



export type CreateUserParams = {
  clerkId: string
  id: string;
  firstName: string
  lastName: string
  username: string
  email: string
  photo: string
  accessToken: string
}

export type UpdateUserParams = {
  firstName: string
  lastName: string
  username: string
  photo: string
}

export type YoutubeUploadParams = {
  event: {
    title: string
    description: string
    genre: string
    imageUrl: string
    videoUrl: CustomFile
    categoryId: string
  }
  path: string
}

// ====== EVENT PARAMS
export type CreateEventParams = {
  event: {
    title: string
    description: string
    genre: string
    imageUrl: string
    audioUrl?: string
    videoUrl?: string
    categoryId: string
  }
  path: string
}

// ====== EVENT PARAMS
export type CreateVideoParams = {
  event: {
    title: string
    description: string
    genre: string
    imageUrl: string
    videoUrl: string
    categoryId: string
  }
  path: string
}

export type CustomFile = {
  buffer: Buffer;
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
}

export type UpdateEventParams = {
  userId: string
  event: {
    _id: string
    title: string
    imageUrl: string
    audioUrl?: string
    videoUrl?: string
    description: string
    genre: string
    categoryId: string
    views?: string
    likes?: string
  }
  path: string
}

export type DeleteEventParams = {
  eventId: string
  path: string
}

export type GetAllEventsParams = {
  query: string
  category: string
  genre: string
  limit: number
  page: number
}

export type GetEventsByUserParams = {
  userId: string
  limit?: number
  page: number
}

export type GetRelatedEventsByCategoryParams = {
  categoryId: string
  genre: string
  eventId: string
  limit?: number
  page: number | string
}

export type Event = {
  _id: string;
  title: string;
  description?: string;
  genre: { _id: string, name: string, type: string };
  createdAt: Date;
  imageUrl: string;
  audioUrl: string,
  videoUrl: string,
  views: string;
  likes: string;
  isFree: boolean;
  socialUrl?: {
    facebook?: string;
    youtube?: string;
    instagram?: string;
  };
  category: { _id: string, name: string, type: string }
}

// ====== CATEGORY PARAMS
export type CreateCategoryParams = {
  categoryName: string
  type: string
}

// ====== GENRE PARAMS
export type CreateGenreParams = {
  genreName: string
  type: string
}


// ====== ORDER PARAMS
export type CheckoutOrderParams = {
  eventTitle: string
  eventId: string
  price: string
  isFree: boolean
  buyerId: string
}

export type CreateOrderParams = {
  stripeId: string
  eventId: string
  buyerId: string
  totalAmount: string
  createdAt: Date
}

export type GetOrdersByEventParams = {
  eventId: string
  searchString: string
}

export type GetOrdersByUserParams = {
  userId: string | null
  limit?: number
  page: string | number | null
}

// ====== URL QUERY PARAMS
export type UrlQueryParams = {
  params: string
  key: string
  value: string | null
}

export type RemoveUrlQueryParams = {
  params: string
  keysToRemove: string[]
}

export type SearchParamProps = {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}
