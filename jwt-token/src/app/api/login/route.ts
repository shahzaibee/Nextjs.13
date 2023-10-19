import { SignJWT, jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const user = await request.json();

  if (user.name == "Shahzaib") {
    const secret = new TextEncoder().encode("shahzaib-ki-story");
    const alg = "HS256";
    const jwt = await new SignJWT(user)
      .setProtectedHeader({ alg })
      .setIssuedAt()
      .setIssuer("urn:example:issuer")
      .setAudience("urn:example:audience")
      .setExpirationTime("2h")
      .sign(secret);
    const response = NextResponse.json({ Success: true, user, jwt });
    response.cookies.set({
      name: "token",
      value: jwt,
      httpOnly: true,
    });
    return response;
  }
  return NextResponse.json({ Success: false });
};

export const GET = async (request: NextRequest) => {
  try {
    const jwt = await request.cookies.get("token");

    const secret = new TextEncoder().encode("shahzaib-ki-story");

    if (jwt) {
      const { payload } = await jwtVerify(jwt.value, secret);

      if (payload.roll == "Developer") {
        return NextResponse.json("welcome");
      } else {
        return NextResponse.json("Incorrect");
      }
    }
    return NextResponse.json("Must login incorrect token");
  } catch (error) {
    return NextResponse.json("Must login incorrect token");
  }
};
