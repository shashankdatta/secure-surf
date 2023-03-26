import getGPTResponse from "@/lib/openai/chatBot1";

export async function GET(request) {
  const { searchParams } = new URL(request.url);

  const output = await getGPTResponse(searchParams.get("prompt"));

  return new Response(output, {
    status: 200,
  });
}
