import { cn } from "@/lib/utils";

export const Icons = {
  ulstein: (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 40" {...props}>
      <text x="50" y="25" fontFamily="Arial, sans-serif" fontSize="20" fontWeight="bold" textAnchor="middle" fill="currentColor">ULSTEIN</text>
    </svg>
  ),
  dnv: (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 40" {...props}>
      <text x="50" y="25" fontFamily="Arial, sans-serif" fontSize="20" fontWeight="bold" textAnchor="middle" fill="currentColor">DNV</text>
    </svg>
  ),
  maritimeCleanTech: (props: React.SVGProps<SVGSVGElement>) => (
     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 40" {...props}>
      <text x="75" y="25" fontFamily="Arial, sans-serif" fontSize="12" fontWeight="bold" textAnchor="middle" fill="currentColor">MARITIME CLEANTECH</text>
    </svg>
  ),
  schottel: (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 40" {...props}>
      <text x="50" y="25" fontFamily="Arial, sans-serif" fontSize="18" fontWeight="bold" textAnchor="middle" fill="currentColor">SCHOTTEL</text>
    </svg>
  ),
};
