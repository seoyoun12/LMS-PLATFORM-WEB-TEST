import {MaterialType,useGetLearningMaterial } from '@common/api/learningMaterial';
import { Container,ContentContainer,ItemContainer,ItemContentContainer,ItemContentHeaderContainer,ItemContentSubtitle,ItemContentTitle,ItemImageContainer } from './style';
import { NotFound } from '@components/ui/NotFound';
import { format } from 'date-fns';
import { useRouter } from 'next/router';
import Image from 'next/image';

interface Props {
  materialType: MaterialType;
}

export default function Layout({ materialType }: Props) {
  const { data } = useGetLearningMaterial(materialType, '');
  const router = useRouter();
  
  const handleClickPost = (id: number) => router.push(`/traffic/learning-material/education/${id}`);
  
  return (
    <Container>
      
      <ContentContainer>
        {data?.data.length <= 0
        ? <NotFound content="자료가 존재하지 않습니다!" />
        : data?.data &&
            data.data.map((item, index) => (
              <ItemContainer
                key={index}
                onClick={() => handleClickPost(item.seq)}
              >
                <ItemImageContainer>
                  <Image
                    src={`https://img.youtube.com/vi/${item.origin?.split('&')[0].split('v=')[1]}/maxresdefault.jpg`}
                    width={320}
                    height={180}
                    objectFit='contain'
                    alt="영상자료 썸네일"
                    />
                </ItemImageContainer>
                <ItemContentContainer>
                  <ItemContentHeaderContainer>
                    <ItemContentTitle>
                      {item.title}
                    </ItemContentTitle>
                  </ItemContentHeaderContainer>
                  <ItemContentSubtitle>
                    {format(new Date(item.createdDtime), 'yyyy. MM. dd')}
                  </ItemContentSubtitle>
                </ItemContentContainer>
              </ItemContainer>
            ))}
      </ContentContainer>
    </Container>
  );
}
