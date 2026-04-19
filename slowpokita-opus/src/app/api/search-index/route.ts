import { NextResponse } from "next/server";
import { postUseCases } from "@/infrastructure/container";

export async function GET() {
  const index = await postUseCases.searchIndex();
  return NextResponse.json(index);
}
