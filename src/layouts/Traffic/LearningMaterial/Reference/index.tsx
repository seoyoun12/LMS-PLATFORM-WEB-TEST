import { MaterialType } from "@common/api/learningMaterial";

interface ReferenceLayoutProps {
  materialType: MaterialType;
}

export default function ReferenceLayout({
  materialType,
}: ReferenceLayoutProps) {
  return <p>Reference</p>;
}
