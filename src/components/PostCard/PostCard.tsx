'use client';

import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';

import { addComment } from '@/app/actions/addComment';
import { deleteComment } from '@/app/actions/deleteComment';
import { flagPost } from '@/app/actions/flagPost';
import { toggleLike } from '@/app/actions/toggleLike';
import { updateComment } from '@/app/actions/updateComment';
import { Card } from '@/components/ui/card';
import { TPostSchema } from '@/types/dbTablesTypes';

import { CustomAlertDialog } from '../CustomAlertDialog';
import FlagPostDialog from './FlagPostDialog';
import PostContent from './PostContent';
import PostFooter from './PostFooter';
import PostHeader from './PostHeader';
import PostTitle from './PostTitle';

type PostCardProps = {
  post: TPostSchema;
  edit?: boolean;
  isLikedByUser?: boolean;
};

export default function PostCard({ post, edit, isLikedByUser }: PostCardProps) {
  const { id, title, content, flags, tags, author, createdAt, _count } = post;
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  // State for UI controls
  const [isExpanded, setIsExpanded] = useState(false);
  const [isFlagDialogOpen, setIsFlagDialogOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // State for tracking comment deletion
  const [commentIdToDelete, setCommentIdToDelete] = useState<string | null>(
    null,
  );

  // User role and permissions
  const isAuthor = session?.user?.id === author?.id;
  const isAdmin = session?.user?.role === 'admin';
  const hasFlagged = flags?.some((flag) => flag.userId === session?.user?.id);

  /**
   * Handler to toggle like status on the post.
   */
  const handleToggleLike = async () => {
    try {
      await toggleLike(id);
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  /**
   * Handler to flag the post with a given reason.
   * @param reason - Reason for flagging the post.
   * @returns boolean indicating success or failure.
   */
  const handleFlagPost = async (reason: string) => {
    try {
      const res = await flagPost(id, reason);
      if (!res?.success) throw new Error('Failed to flag post');
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      return true;
    } catch (err) {
      console.error('Error flagging post:', err);
      return false;
    }
  };

  /**
   * Handler to add a comment to the post.
   * @param comment - The comment content to add.
   */
  const handleAddComment = async (comment: string) => {
    console.log('Adding comment:', comment);

    try {
      const res = await addComment({
        postId: id,
        content: comment,
      });

      if (!res?.success) {
        // No action needed on failure here
      } else {
        queryClient.invalidateQueries({ queryKey: ['posts'] });
        toast.success('Comment added successfully');
      }
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  /**
   * Handler to delete a comment by its ID.
   * @param commentId - ID of the comment to delete.
   */
  const handleDeleteComment = async (commentId: string) => {
    try {
      await deleteComment(commentId);
      queryClient.invalidateQueries({ queryKey: ['comments'] });
      toast.success('Comment deleted successfully');
    } catch (e) {
      console.error('Error deleting comment:', e);
      toast.error('Failed to delete comment');
    }
  };

  const handleUpdateComment = async (commentId: string, content: string) => {
    try {
      const res = await updateComment(commentId, content);

      if (!res?.success) {
        toast.error('Failed to update comment');
      } else {
        queryClient.invalidateQueries({ queryKey: ['comments'] });
        toast.success('Comment updated successfully');
      }
    } catch (e) {
      console.error('Error updating comment:', e);
      toast.error('Failed to update comment');
    }
  };

  return (
    <>
      {/* Confirmation dialog for deleting a comment */}
      <CustomAlertDialog
        open={!!commentIdToDelete}
        title='Delete comment?'
        description='Are you sure you want to delete this comment? This action cannot be undone.'
        confirmText='Delete'
        onConfirm={() => {
          if (commentIdToDelete) {
            handleDeleteComment(commentIdToDelete);
            setCommentIdToDelete(null);
          }
        }}
        onCancel={() => setCommentIdToDelete(null)}
      />

      {/* Dialog for flagging a post */}
      <FlagPostDialog
        open={isFlagDialogOpen}
        onClose={() => setIsFlagDialogOpen(false)}
        onSubmit={async (reason) => {
          const success = await handleFlagPost(reason);
          if (success) {
            setIsFlagDialogOpen(false);
          }
        }}
      />

      {/* Main post card container */}
      <Card className='border-muted bg-background max-w-full overflow-hidden rounded-xl border shadow hover:shadow-md'>
        <PostHeader
          author={author}
          createdAt={createdAt}
          dropdownOpen={dropdownOpen}
          setDropdownOpen={setDropdownOpen}
          hasFlagged={hasFlagged || false}
          onFlag={() => {
            setDropdownOpen(false);
            setIsFlagDialogOpen(true);
          }}
          onUnflag={() => handleFlagPost('')}
        />

        <PostTitle title={title} />

        <PostContent
          content={content}
          createdAt={createdAt}
          tags={tags}
          isExpanded={isExpanded}
          setIsExpanded={setIsExpanded}
          isLongContent={content.split('\n').length > 5}
        />

        <PostFooter
          commentCount={_count?.comments || 0}
          flagCount={_count?.flags || 0}
          likesCount={_count?.likes || 0}
          isLikedByUser={isLikedByUser}
          onToggleLikeAction={handleToggleLike}
          edit={edit}
          isAuthor={isAuthor}
          isAdmin={isAdmin}
          postId={id}
          title={title}
          content={content}
          tags={tags}
          onAddCommentAction={handleAddComment}
          onUpdateCommentAction={handleUpdateComment}
          onDeleteCommentAction={(commentId) => setCommentIdToDelete(commentId)}
        />
      </Card>
    </>
  );
}
