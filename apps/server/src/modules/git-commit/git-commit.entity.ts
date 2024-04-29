import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'cr_commit_detail' })
export class GitCommit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'main_id' })
  mainId: string;

  @Column({ name: 'user_name' })
  userName: string;

  @Column({ name: 'project_name' })
  projectName: string;

  @Column({ name: 'month' })
  month: string;

  @Column({ name: 'commit_id' })
  commitId: string;

  @Column()
  files: number;

  @Column()
  total: number;

  @Column({ name: 'sub_lines' })
  subLines: number;

  @Column({ name: 'add_lines' })
  addLines: number;

  @CreateDateColumn({
    name: 'create_time',
    type: 'datetime',
  })
  createTime: Date;

  @Column({ name: 'commit_at' })
  commitAt: string;

  @Column({ name: 'add_files' })
  addFiles: number;

  @Column({ name: 'sub_files' })
  subFiles: number;
}
