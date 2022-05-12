"""adding comments

Revision ID: 612714157371
Revises: 44f850c7fe54
Create Date: 2022-05-12 17:05:20.698935

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '612714157371'
down_revision = '44f850c7fe54'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('comments',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('outgoing_id', sa.Integer(), nullable=False),
    sa.Column('message', sa.Text(), nullable=False),
    sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=True),
    sa.Column('updated_at', sa.DateTime(timezone=True), nullable=True),
    sa.ForeignKeyConstraint(['outgoing_id'], ['outgoings.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.add_column('outgoings', sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=True))
    op.add_column('outgoings', sa.Column('updated_at', sa.DateTime(timezone=True), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('outgoings', 'updated_at')
    op.drop_column('outgoings', 'created_at')
    op.drop_table('comments')
    # ### end Alembic commands ###
