export default function Footer() {
	return (
		<section className="mx-auto my-12 max-w-7xl space-y-8 px-4 text-center text-sm sm:px-6 lg:px-8">
			<div>
				<p>
					このサイトは情報提供のみを目的としています。各サービスの解約ポリシーは変更される可能性があります。
				</p>
				<p>
					このサイトは上記のサービスと正式に提携しているものではありません。
				</p>
			</div>
			<footer>©{new Date().getFullYear()} Kakushin Gijutsu Co., Ltd.</footer>
		</section>
	);
}
