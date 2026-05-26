import { FaShoppingCart, FaTruck, FaBan, FaDollarSign } from "react-icons/fa";
import PageHeader from "../components/PageHeader";

// Import komponen UI sesuai standar shadcn/ui
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function FiturXyz() {
  return (
    <div id="dashboard-container" className="p-6">
      <PageHeader title="Dashboard"/>
      <p className="mb-4 text-gray-600">Ini halaman Fitur XYZ</p>
      
      {/* Container untuk jajaran tombol */}
      <div className="flex flex-wrap gap-2 mb-6">
        <Button variant="" size="xs">Simpan</Button>
        <Button variant="outline" size="sm">Simpan</Button>
        <Button variant="destructive">Simpan</Button>
      </div>

      {/* Komponen Card Baru */}
      <Card className="mt-4 w-[380px]">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Belajar shadcn/ui</CardTitle>
            <Badge variant="secondary">Baru</Badge>
          </div>
          <CardDescription>
            Contoh penggunaan komponen shadcn/ui di React
          </CardDescription>
        </CardHeader>

        <CardContent>
          <p className="text-sm text-muted-foreground">
            Komponen ini dibuat di branch <strong>setup-shadcn</strong> lalu di-merge ke main.
          </p>
        </CardContent>

        <CardFooter className="flex gap-2">
          <Button>Simpan</Button>
          <Button variant="outline">Batal</Button>
        </CardFooter>
      </Card>
    </div>
  );
}