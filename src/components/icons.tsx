import {
  Battery,
  CircleDot,
  Disc3,
  Droplets,
  ScanLine,
  Wind,
} from "lucide-react";
const icons = {
  oil: Droplets,
  brakes: Disc3,
  diagnostics: ScanLine,
  battery: Battery,
  tires: CircleDot,
  ac: Wind,
};
export function ServiceIcon({
  name,
  size = 25,
}: {
  name: keyof typeof icons;
  size?: number;
}) {
  const Icon = icons[name];
  return <Icon size={size} strokeWidth={1.5} aria-hidden="true" />;
}
