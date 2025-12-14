import Image from "next/image";
import Link from "next/link";
import type { ServiceType } from "@/lib/type";

interface CardListSectionProps {
	services: ServiceType[];
}

const CardListSection = ({ services }: CardListSectionProps) => {
	return (
		<div className="py-8">
			{services.length === 0 ? (
				<div className="grid h-full min-h-[300px] place-items-center">
					<p className="text-center">サービスが見つかりませんでした。</p>
				</div>
			) : (
				<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{services.map((service) => (
						<div
							key={service.id}
							className="flex flex-col items-center justify-center gap-4 p-4"
						>
							<div className="relative max-h-[200px] min-h-[200px] min-w-[200px] max-w-[200px] rounded-full bg-white p-2">
								<div className="grid h-full w-full place-items-center rounded-full border border-orange border-dotted p-4">
									<Image
										src={service.image.url}
										alt={`${service.title}のロゴ`}
										width={200}
										height={200}
										className="aspect-video object-contain"
										priority
									/>
								</div>
							</div>
							<div className="space-y-1 text-center">
								<h3 className="font-bold text-xl">{service.title}</h3>
								<p className="font-medium text-gray text-xs">
									{service.description}
								</p>
							</div>
							<div className="flex items-center gap-4 lg:gap-2">
								<Link
									href={service.cancel_url}
									className="rounded-2xl bg-red px-7 py-3 font-bold text-black shadow-[0px_2px_0px_0px_#A6A4A24D]"
									target="_blank"
									rel="noopener noreferrer"
								>
									解約する
								</Link>
								<Link
									href={service.register_url}
									className="rounded-2xl bg-green px-7 py-3 font-bold text-black shadow-[0px_2px_0px_0px_#A6A4A24D]"
									target="_blank"
									rel="noopener noreferrer"
								>
									登録する
								</Link>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default CardListSection;
