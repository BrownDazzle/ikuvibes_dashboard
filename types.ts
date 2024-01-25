
// Update the User type to include the accessToken property
export interface ExtendedUser extends User {
  accessToken?: string;
}

export type SafeUser = Omit<
  User,
  "createdAt" | "updatedAt" | "emailVerified"
> & {
  picture?: {
    data: {
      url: string
    }
  };
  accessToken?: string;
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
};

export interface Product {
  id: string;
  category: Category;
  title: string;
  subTitle: string;
  price: string;
  isPromo: string,
  isFeatured: boolean;
  publisher: Publisher;
  level: Level;
  images: Image[]
  quantity: string | number;
};

export interface Image {
  id: string;
  url: string;
}

export interface Billboard {
  id: string;
  label: string;
  desc: string;
  imageUrl: string;
};

export interface Category {
  id: string;
  name: string;
  url: string;
};

export interface Publisher {
  id: string;
  name: string;
  value: string;
};

export interface Level {
  id: string;
  name: string;
  value: string;
};

export interface Order {
  id: string;
  orderedBy?: string | User;
  stripePaymentIntentID?: string;
  total: number;
  items?: {
    product: string | Product;
    price?: number;
    quantity?: number;
    id?: string;
  }[];
  updatedAt: string;
  createdAt: string;
}

export type CartItems = {
  product?: string | Product;
  quantity?: number;
  id?: string;
}[];

export interface User {
  id: string;
  name?: string;
  image?: string;
  picture?: string;
  updatedAt: string;
  createdAt: string;
  email: string;
  accessToken?: string;
}

export interface Media {
  id: string;
  alt: string;
  caption?: {
    [k: string]: unknown;
  }[];
  updatedAt: string;
  createdAt: string;
  url?: string;
  filename?: string;
  mimeType?: string;
  filesize?: number;
  width?: number;
  height?: number;
}
export interface Settings {
  id: string;
  productsPage?: string;
  updatedAt?: string;
  createdAt?: string;
}
export interface Footer {
  id: string;
  copyright: string;
  navItems?: {
    link: {
      type?: 'reference' | 'custom';
      newTab?: boolean;
      reference: {
        relationTo: 'pages';
        value: string;
      };
      url: string;
      label: string;
      icon?: string | Media;
    };
    id?: string;
  }[];
  updatedAt?: string;
  createdAt?: string;
}

export interface Product {
  id: string;
  title: string;
  publishedOn?: string;
  layout?: (
    | {
      invertBackground?: boolean;
      richText: {
        [k: string]: unknown;
      }[];
      links?: {
        link: {
          type?: 'reference' | 'custom';
          newTab?: boolean;
          reference: {
            relationTo: 'pages';
            value: string;
          };
          url: string;
          label: string;
          icon?: string | Media;
          appearance?: 'primary' | 'secondary';
        };
        id?: string;
      }[];
      id?: string;
      blockName?: string;
      blockType: 'cta';
    }
    | {
      invertBackground?: boolean;
      columns?: {
        size?: 'oneThird' | 'half' | 'twoThirds' | 'full';
        richText: {
          [k: string]: unknown;
        }[];
        enableLink?: boolean;
        link?: {
          type?: 'reference' | 'custom';
          newTab?: boolean;
          reference: {
            relationTo: 'pages';
            value: string;
          };
          url: string;
          label: string;
          icon?: string | Media;
          appearance?: 'default' | 'primary' | 'secondary';
        };
        id?: string;
      }[];
      id?: string;
      blockName?: string;
      blockType: 'content';
    }
    | {
      invertBackground?: boolean;
      position?: 'default' | 'fullscreen';
      media: string | Media;
      id?: string;
      blockName?: string;
      blockType: 'mediaBlock';
    }
    | {
      introContent: {
        [k: string]: unknown;
      }[];
      populateBy?: 'collection' | 'selection';
      relationTo?: 'products';
      categories?: string[] | Category[];
      limit?: number;
      selectedDocs?:
      | {
        relationTo: 'products';
        value: string;
      }[]
      | {
        relationTo: 'products';
        value: Product;
      }[];
      populatedDocs?:
      | {
        relationTo: 'products';
        value: string;
      }[]
      | {
        relationTo: 'products';
        value: Product;
      }[];
      populatedDocsTotal?: number;
      id?: string;
      blockName?: string;
      blockType: 'archive';
    }
  )[];
  stripeProductID?: string;
  priceJSON?: string;
  enablePaywall?: boolean;
  paywall?: (
    | {
      invertBackground?: boolean;
      richText: {
        [k: string]: unknown;
      }[];
      links?: {
        link: {
          type?: 'reference' | 'custom';
          newTab?: boolean;
          reference: {
            relationTo: 'pages';
            value: string;
          };
          url: string;
          label: string;
          icon?: string | Media;
          appearance?: 'primary' | 'secondary';
        };
        id?: string;
      }[];
      id?: string;
      blockName?: string;
      blockType: 'cta';
    }
    | {
      invertBackground?: boolean;
      columns?: {
        size?: 'oneThird' | 'half' | 'twoThirds' | 'full';
        richText: {
          [k: string]: unknown;
        }[];
        enableLink?: boolean;
        link?: {
          type?: 'reference' | 'custom';
          newTab?: boolean;
          reference: {
            relationTo: 'pages';
            value: string;
          };
          url: string;
          label: string;
          icon?: string | Media;
          appearance?: 'default' | 'primary' | 'secondary';
        };
        id?: string;
      }[];
      id?: string;
      blockName?: string;
      blockType: 'content';
    }
    | {
      invertBackground?: boolean;
      position?: 'default' | 'fullscreen';
      media: string | Media;
      id?: string;
      blockName?: string;
      blockType: 'mediaBlock';
    }
    | {
      introContent: {
        [k: string]: unknown;
      }[];
      populateBy?: 'collection' | 'selection';
      relationTo?: 'products';
      categories?: string[] | Category[];
      limit?: number;
      selectedDocs?:
      | {
        relationTo: 'products';
        value: string;
      }[]
      | {
        relationTo: 'products';
        value: Product;
      }[];
      populatedDocs?:
      | {
        relationTo: 'products';
        value: string;
      }[]
      | {
        relationTo: 'products';
        value: Product;
      }[];
      populatedDocsTotal?: number;
      id?: string;
      blockName?: string;
      blockType: 'archive';
    }
  )[];
  categories?: string[] | Category[];
  relatedProducts?: string[] | Product[];
  slug?: string;
  skipSync?: boolean;
  meta?: {
    title?: string;
    description?: string;
    image?: string | Media;
  };
  updatedAt: string;
  createdAt: string;
  _status?: 'draft' | 'published';
}

export interface Order {
  productImage: Image[];
  orderItems: [];
  phone: number;
  address: string;
  customerName: string;
  totalAmount: number;
  status: string;
  orderID: string;
  location: string;
  isPaid: boolean
}

export interface Course {
  id: string;
  userId: string;
  title: string;
  description: string;
  imageUrl: string;
  price: number;
  isPublished: boolean;
  progress: number;
  categoryId: string;
  category: CourseCategory

  chapters: Chapter[]
  attachments: Attachment[]
  purchases: Purchase[]

  createdAt: string;
  updatedAt: string;

}

export interface CourseCategory {
  id: string;
  name: string;
  courses: Course[]
  progress: number
}

export interface Attachment {
  id: string
  name: string;
  url: string

  courseId: string;
  course: Course

  createdAt: string;
  updatedAt: string;

}

export interface Chapter {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  position: any;
  isPublished: boolean;
  isFree: boolean;

  muxData: MuxData;

  courseId: string;
  course: Course;

  userProgress: UserProgress[];
  attachments: Attachment[]
  purchases: Purchase[]


  createdAt: string;
  updatedAt: string;

}

export interface MuxData {
  id: string;
  assetId: string;
  playbackId: string;

  chapterId: string;
  chapter: Chapter;
}

export interface UserProgress {
  id: string
  userId: string;

  chapterId: string;
  chapter: Chapter

  isCompleted: boolean;

  createdAt: string;
  updatedAt: string;

}

export interface Purchase {
  id: string
  userId: string;

  courseId: string;
  course: Course;

  createdAt: string;
  updatedAt: string;
}

export interface StripeCustomer {
  id: string
  userId: string;
  stripeCustomerId: string;

  createdAt: string;
  updatedAt: string;
}

export interface ShippingAddress {
  phone: number;
  province: string;
  city: string;
  streetAddress: string;
  // Add other address fields as needed
}
