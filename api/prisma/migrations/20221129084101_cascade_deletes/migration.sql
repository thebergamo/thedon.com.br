-- DropForeignKey
ALTER TABLE "Article" DROP CONSTRAINT "Article_issueId_fkey";

-- AddForeignKey
ALTER TABLE "Article" ADD CONSTRAINT "Article_issueId_fkey" FOREIGN KEY ("issueId") REFERENCES "Issue"("id") ON DELETE CASCADE ON UPDATE CASCADE;
