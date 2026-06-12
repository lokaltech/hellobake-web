-- CreateTable
CREATE TABLE "StoreSettings" (
    "id" TEXT NOT NULL DEFAULT 'default',
    "whatsappNumber" TEXT NOT NULL DEFAULT '6285121118121',
    "instagramUrl" TEXT,
    "tiktokUrl" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StoreSettings_pkey" PRIMARY KEY ("id")
);
