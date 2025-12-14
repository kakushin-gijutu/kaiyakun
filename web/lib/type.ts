type BaseResponseType<T> = {
	contents: T[];
	totalCount: number;
	offset: number;
	limit: number;
};

export type CategoryType = {
	id: string;
	createdAt: string;
	updatedAt: string;
	publishedAt: string;
	revisedAt: string;
	title: string;
	icon: Image;
};

export type Image = {
	url: string;
	height: number;
	width: number;
};

export type ServiceType = {
	id: string;
	createdAt: string;
	updatedAt: string;
	publishedAt: string;
	revisedAt: string;
	image: Image;
	title: string;
	description: string;
	cancel_url: string;
	register_url: string;
	category: CategoryType[];
};

export type CategoryResponseType = BaseResponseType<CategoryType>;
export type ServiceResponseType = BaseResponseType<ServiceType>;
