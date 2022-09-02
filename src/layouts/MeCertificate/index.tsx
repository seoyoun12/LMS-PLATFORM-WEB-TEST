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
  PrintModal,
  PrintModalButton,
  PrintModalButtonWrapper,
  PrintModalImage,
  PrintModalWrapper,
} from "@components/MeCertificate/style";
import { useGetUserMyinfoCertificates } from "@common/api/user/myinfo/certificates";
import { GET, POST } from "@common/httpClient";
import {
  UserMyinfoCertificatesConfirmResponseDto,
  UserMyinfoCertificatesResponseDto,
} from "@common/api/Api";
import BackgroundImage from "public/assets/images/certificates_background.svg";
import { NotFound } from "@components/ui/NotFound";
import { useState } from "react";
import { AxiosResponse } from "axios";

const MeCertificate: NextPage = () => {
  const { certificateList, mutate } = useGetUserMyinfoCertificates();

  console.log(certificateList);
  const [selectedCertificate, setSelectedCertificate] =
    useState<UserMyinfoCertificatesConfirmResponseDto | null>(null);

  const handleClickCertificatesDownload = async (
    item: UserMyinfoCertificatesResponseDto
  ) => {
    if (!item.courseUserSeq) {
      return;
    }

    try {
      const { data } = await GET<
        AxiosResponse<UserMyinfoCertificatesConfirmResponseDto>
      >(`/user/myinfo/certificates/confirm/${item.courseUserSeq}`);
      mutate();
      setSelectedCertificate(data);
    } catch (e) {
      alert(e.data.message);
    }
    return;
  };

  const handleClickDownloadCertificate = async () => {
    if (!selectedCertificate?.courseUserSeq) {
      return;
    }

    console.log(selectedCertificate);

    alert("수료 조건을 충족하여 증명서가 발급됩니다.");

    const data = await POST<string>(
      `/user/myinfo/certificates/download/${selectedCertificate.courseUserSeq}`,
      {},
      {
        responseType: "blob",
      }
    );

    const url = window.URL.createObjectURL(new Blob([data]));
    const a = document.createElement("a");
    a.href = url;
    a.download = `${selectedCertificate.fileName}.pdf`;
    a.click();
    a.remove();
  };

  const handleClickPrintCertificate = () => {
    if (!selectedCertificate?.courseUserSeq) {
      return;
    }

    const win = window.open();
    self.focus();
    win.document.open();

    win.document.write('<html lang="ko"><head>');
    win.document.write('<meta charset="UTF-8">');
    win.document.write("</head><body>");
    win.document.write(
      `<img src="${selectedCertificate.certImagePath}" style="width: 100%;" />`
    );
    win.document.write("</body></html>");
    win.document.close();
    setTimeout(function () {
      win.print();
      win.close();
    }, 250);
  };

  return (
    <MeCertificateContainer>
      <PrintModal
        open={Boolean(selectedCertificate)}
        title="증명서 발급"
        onCloseModal={() => setSelectedCertificate(null)}
      >
        {selectedCertificate && (
          <PrintModalWrapper>
            <PrintModalImage src={selectedCertificate.certImagePath} />
            <PrintModalButtonWrapper>
              <PrintModalButton onClick={handleClickPrintCertificate}>
                프린트
              </PrintModalButton>
              <PrintModalButton onClick={handleClickDownloadCertificate}>
                저장
              </PrintModalButton>
            </PrintModalButtonWrapper>
          </PrintModalWrapper>
        )}
      </PrintModal>
      <MeCertificateHeaderContainer>
        <MeCertificateHeaderTitle>증명서 발급</MeCertificateHeaderTitle>
        <MeCertificateHeaderSubtitle>
          수료확인 및 증명서 발급을 받을 수 있습니다!
        </MeCertificateHeaderSubtitle>
        <BackgroundImage />
      </MeCertificateHeaderContainer>

      <MeCertificateContentContainer>
        {certificateList?.data.length <= 0 ? (
          <NotFound content="신청한 과정이 존재하지 않습니다!" />
        ) : (
          <>
            {certificateList?.data &&
              certificateList.data.map((item, index) => (
                <MeCertificateItemContainer
                  key={index}
                  onClick={() => handleClickCertificatesDownload(item)}
                >
                  <MeCertificateItemImageContainer>
                    {item.s3Files && item.s3Files.length > 0 && (
                      <img src={item.s3Files[0].path} alt="course thumbnail" />
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
          </>
        )}
      </MeCertificateContentContainer>
    </MeCertificateContainer>
  );
};

export default MeCertificate;
