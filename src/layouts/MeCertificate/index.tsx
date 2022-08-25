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
import { format } from "date-fns";
import BackgroundImage from "public/assets/images/certificates_background.svg";
import { NotFound } from "@components/ui/NotFound";
import { useRouter } from "next/router";
import { useState } from "react";
import axios, { AxiosResponse } from "axios";
import Image from "next/image";

const MeCertificate: NextPage = () => {
  const { certificateList, mutate } = useGetUserMyinfoCertificates();
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
    if (!selectedCertificate?.seq) {
      return;
    }

    alert("수료 조건을 충족하여 증명서가 발급됩니다.");
    const dateNow = new Date();

    const data = await POST<string>(
      `/user/myinfo/certificates/download/${selectedCertificate.seq}`,
      {},
      {
        responseType: "blob",
      }
    );

    const url = window.URL.createObjectURL(new Blob([data]));
    const a = document.createElement("a");
    a.href = url;
    a.download = `asd_수료확인서_${format(dateNow, "yyyyMMdd")}.pdf`;
    a.click();
    a.remove();
  };

  const handleClickPrintCertificate = () => {
    if (!selectedCertificate?.seq) {
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
          학습중인 과정의 수료확인 및 증명서 발급을 받을 수 있습니다!
        </MeCertificateHeaderSubtitle>
        <BackgroundImage />
      </MeCertificateHeaderContainer>

      <MeCertificateContentContainer>
        {certificateList?.data.length <= 0 && (
          <NotFound content="신청한 과정이 존재하지 않습니다!" />
        )}
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
