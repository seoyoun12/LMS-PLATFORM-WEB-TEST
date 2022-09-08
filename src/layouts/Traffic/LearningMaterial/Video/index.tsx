import { MaterialType } from "@common/api/learningMaterial";

interface VideoLayoutProps {
  materialType: MaterialType;
}

export default function VideoLayout({ materialType }: VideoLayoutProps) {
  return <p>Video</p>;
}
