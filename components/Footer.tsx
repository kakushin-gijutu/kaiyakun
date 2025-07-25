export default function Footer() {
	return (
		<section className="my-12 space-y-8 text-center text-sm">
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
