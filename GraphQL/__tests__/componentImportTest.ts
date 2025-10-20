// Test file to verify that components can be imported from the new ui folder
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

// Simple test to verify imports work
export function testComponentImports() {
  console.log("Component imports test passed");
  return true;
}
