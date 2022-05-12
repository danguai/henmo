"""adding outgoing

Revision ID: 44f850c7fe54
Revises: 0a39f6cc08fa
Create Date: 2022-05-11 15:19:46.062850

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '44f850c7fe54'
down_revision = '0a39f6cc08fa'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('outgoings',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('payer_id', sa.Integer(), nullable=False),
    sa.Column('receiver_id', sa.Integer(), nullable=False),
    sa.Column('pay_funds', sa.Integer(), nullable=False),
    sa.Column('message', sa.Text(), nullable=False),
    sa.Column('paid', sa.Boolean(), nullable=False),
    sa.ForeignKeyConstraint(['payer_id'], ['users.id'], ),
    sa.ForeignKeyConstraint(['receiver_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('outgoings')
    # ### end Alembic commands ###