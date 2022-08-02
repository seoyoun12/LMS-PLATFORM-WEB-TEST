import {NextPage} from "next";
import {
	MeCertificateContainer,
	MeCertificateContentContainer,
	MeCertificateHeaderContainer,
	MeCertificateHeaderSubtitle,
	MeCertificateHeaderTitle, MeCertificateItemConfirmButton,
	MeCertificateItemContainer,
	MeCertificateItemContentContainer, MeCertificateItemContentSubtitle, MeCertificateItemContentTitle,
	MeCertificateItemImageContainer
} from "@components/MeCertificate/style";
import {useGetUserMyinfoCertificates} from "@common/api/user/myinfo/certificates";

const MeCertificate: NextPage = () => {
	const data = useGetUserMyinfoCertificates();

	return (
		<MeCertificateContainer>
			<MeCertificateHeaderContainer>
				<MeCertificateHeaderTitle>수료증 발급</MeCertificateHeaderTitle>
				<MeCertificateHeaderSubtitle>학습중인 과정의 수료확인 및 수료증 발급을 받을 수 있습니다!</MeCertificateHeaderSubtitle>
			</MeCertificateHeaderContainer>

			<MeCertificateContentContainer>
				{new Array(6).fill(null).map((_, index) => (
					<MeCertificateItemContainer key={index}>
						<MeCertificateItemImageContainer />

						<MeCertificateItemContentContainer>
							<MeCertificateItemContentTitle>프로그래밍 입문자들을 위한 기초</MeCertificateItemContentTitle>
							<MeCertificateItemContentSubtitle>Python</MeCertificateItemContentSubtitle>

							<MeCertificateItemConfirmButton>수료 확인</MeCertificateItemConfirmButton>
						</MeCertificateItemContentContainer>
					</MeCertificateItemContainer>
				))}
			</MeCertificateContentContainer>
		</MeCertificateContainer>
	)
}

export default MeCertificate;
