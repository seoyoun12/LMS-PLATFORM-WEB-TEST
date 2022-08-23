import { NextPage } from "next";
import {
  MeCertificateContainer,
  MeCertificateContentContainer,
  MeCertificateHeaderContainer,
  MeCertificateHeaderSubtitle,
  MeCertificateHeaderTitle,
  MeCertificateItemConfirmButton,
  MeCertificateItemContainer,
  MeCertificateItemContentContainer,
  MeCertificateItemContentTitle,
  MeCertificateItemImageContainer,
} from "@components/MeCertificate/style";
import { useGetUserMyinfoCertificates } from "@common/api/user/myinfo/certificates";
import { POST } from "@common/httpClient";
import { UserMyinfoCertificatesResponseDto } from '@common/api/Api';
import { format } from "date-fns";
import BackgroundImage from "public/assets/images/certificates_background.svg";
import { NotFound } from "@components/ui/NotFound";

const MeCertificate: NextPage = () => {
  const { certificateList } = useGetUserMyinfoCertificates();

  const handleClickCertificatesDownload = async (
    item: UserMyinfoCertificatesResponseDto
  ) => {
    if (!item.courseUserSeq) {
      return;
    }

    if (item.completeYn === "N") {
      alert("수료 조건을 충족하지 않았습니다.");
      return;
    }

    alert("수료 조건을 충족하여 증명서가 발급됩니다.");
    const dateNow = new Date();

    const data = await POST<string>(
      `/user/myinfo/certificates/download/${item.courseUserSeq}`,
      {},
      {
        responseType: "blob",
      }
    );

    const url = window.URL.createObjectURL(new Blob([data]));
    const a = document.createElement("a");
    a.href = url;
    a.download = `${item.courseName}_수료확인서_${format(
      dateNow,
      "yyyyMMdd"
    )}.pdf`;
    a.click();
    a.remove();
  };

  return (
    <MeCertificateContainer>
      <MeCertificateHeaderContainer>
        <MeCertificateHeaderTitle>증명서 발급</MeCertificateHeaderTitle>
        <MeCertificateHeaderSubtitle>
          학습중인 과정의 수료확인 및 증명서 발급을 받을 수 있습니다!
        </MeCertificateHeaderSubtitle>
        <BackgroundImage />
      </MeCertificateHeaderContainer>

      <MeCertificateContentContainer>
        {certificateList?.data.length <= 0 && <NotFound content='신청한 과정이 존재하지 않습니다!' />}
        {certificateList?.data &&
          certificateList.data.map((item, index) => (
            <MeCertificateItemContainer
              key={index}
              onClick={() => handleClickCertificatesDownload(item)}
            >
              <MeCertificateItemImageContainer>
                {item.courseFile && (
                  <img src={item.courseFile} alt="course thumbnail" />
                )}
              </MeCertificateItemImageContainer>

              <MeCertificateItemContentContainer>
                <MeCertificateItemContentTitle>
                  {item.courseName}
                </MeCertificateItemContentTitle>
                {/*<MeCertificateItemContentSubtitle>Python</MeCertificateItemContentSubtitle>*/}

                <MeCertificateItemConfirmButton>
                  {item.completeYn === "Y" ? "증명서 발급" : "수료 확인"}
                </MeCertificateItemConfirmButton>
              </MeCertificateItemContentContainer>
            </MeCertificateItemContainer>
          ))}
      </MeCertificateContentContainer>
    </MeCertificateContainer>
  );
};

export default MeCertificate;
